import fetch from 'node-fetch'

export function validateEnv() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set in the environment variables.')
  }
}

const SYSTEM_PROMPT = `You are an expert job description analyser.
Analyse the provided job description and return ONLY a JSON object with these exact fields:
{
  "title": "inferred job title",
  "experienceLevel": "junior OR mid OR senior OR lead",
  "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "responsibilities": ["responsibility1", "responsibility2", "responsibility3"],
  "salaryRange": "estimated range e.g. $80k-$120k OR unspecified",
  "industryType": "inferred industry",
  "remotePolicy": "remote OR hybrid OR onsite OR unspecified"
}
Return ONLY valid JSON. No markdown. No explanation.`

export async function analyzeJobDescription(text, userId) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jobscan.app',
        'X-Title': 'JobScan AI'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ],
        max_tokens: 600,
        temperature: 0.2
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    const data = await response.json()

    if (data.usage) {
      console.log('[AI_USAGE]', JSON.stringify({
        timestamp: new Date().toISOString(),
        userId,
        model: 'openai/gpt-4o-mini',
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
        endpoint: 'analyze_job_description'
      }))
    }

    if (!response.ok || !data.choices || !data.choices[0]) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const content = data.choices[0].message.content
    try {
      return JSON.parse(content)
    } catch (parseError) {
      throw new Error('Failed to parse JSON response from LLM')
    }

  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      console.error('[AI_TIMEOUT_ERROR]', JSON.stringify({ timestamp: new Date().toISOString(), userId }))
      return { success: false, fallback: true, message: 'Analysis unavailable. Please try again shortly.' }
    }
    console.error('[AI_SERVICE_ERROR]', JSON.stringify({ timestamp: new Date().toISOString(), userId, error: error.message }))
    return { success: false, fallback: true, message: 'Analysis unavailable. Please try again shortly.' }
  }
}
