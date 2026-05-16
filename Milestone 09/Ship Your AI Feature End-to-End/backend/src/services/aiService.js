// backend/src/services/aiService.js
// CONSTRAINT 3: Token logging on every AI call — do not remove the [AI_USAGE] log.
// CONSTRAINT 5: Fallback response on LLM failure — do not remove the try/catch.

import fetch from 'node-fetch'
import { buildPrompt } from '../utils/promptBuilder.js'

// Change this to your chosen model
// Options: 'openai/gpt-4o-mini', 'google/gemini-2.0-flash', 'anthropic/claude-haiku-3-5'
const MODEL = 'openai/gpt-4o-mini'
const TIMEOUT_MS = 15000

export function validateEnv() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      'OPENROUTER_API_KEY is required. Add it to .env locally and to Render Environment in production.'
    )
  }
}

// Replace 'userInput' parameter with whatever your feature receives
// userId comes from req.user.id (set by authMiddleware)
export async function callAI(userInput, userId) {
  // CONSTRAINT 5: AbortController timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    // CONSTRAINT 2: Get messages from promptBuilder (not constructed here)
    const messages = buildPrompt(userInput)

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-app.onrender.com',  // Update with your URL
        'X-Title': 'Your App Name'                          // Update with your app name
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 600,   // Adjust based on your expected output size
        temperature: 0.2   // Lower = more consistent JSON, higher = more creative
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)  // Always clear on success

    const data = await response.json()

    // CONSTRAINT 3: Token logging on every successful call
    if (data.usage) {
      console.log('[AI_USAGE]', JSON.stringify({
        timestamp: new Date().toISOString(),
        userId,
        model: MODEL,
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
        endpoint: 'your-feature-name'  // Update with your feature name
      }))
    }

    if (!data.choices || !data.choices[0]) {
      throw new Error(`Unexpected API response: ${JSON.stringify(data)}`)
    }

    const content = data.choices[0].message.content

    try {
      return JSON.parse(content)
    } catch {
      // Return raw content if JSON parse fails
      return { rawOutput: content, parseError: true }
    }

  } catch (err) {
    clearTimeout(timeoutId)  // Always clear in catch too

    if (err.name === 'AbortError') {
      console.error('[AI_TIMEOUT]', JSON.stringify({
        timestamp: new Date().toISOString(),
        userId,
        endpoint: 'your-feature-name',
        timeoutMs: TIMEOUT_MS
      }))
    } else {
      console.error('[AI_ERROR]', JSON.stringify({
        timestamp: new Date().toISOString(),
        userId,
        endpoint: 'your-feature-name',
        error: err.message
      }))
    }

    // CONSTRAINT 5: Fallback — never crash, always return this shape
    return {
      success: false,
      fallback: true,
      message: 'Analysis unavailable. Please try again shortly.'
    }
  }
}
