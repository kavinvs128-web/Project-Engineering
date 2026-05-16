import fetch from 'node-fetch'

const SYSTEM_PROMPT = `You are an academic study assistant. Analyze the provided notes and return a structured JSON response with exactly these three fields:
- overview: A 3-sentence summary of the main topic
- keyConcepts: An array of exactly 5 key concepts as strings
- examQuestions: An array of exactly 2 likely exam questions as strings

Return ONLY valid JSON. No markdown. No explanation. Just the JSON object.`

export async function summarizeNote(noteContent, userId) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://noteai.app',
      'X-Title': 'NoteAI'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: noteContent }
      ],
      max_tokens: 500,
      temperature: 0.3
    })
  })

  const data = await response.json()

  // TODO: Add token usage logging here
  // After this line, data.usage contains:
  //   data.usage.prompt_tokens    ← tokens used by your system prompt + note
  //   data.usage.completion_tokens ← tokens in the generated summary
  //   data.usage.total_tokens     ← sum of both
  // Log all three fields plus model name and timestamp using console.log('[AI_USAGE]', JSON.stringify({...}))

  if (!data.choices || !data.choices[0]) {
    throw new Error(`Invalid LLM response: ${JSON.stringify(data)}`)
  }

  const content = data.choices[0].message.content

  try {
    return JSON.parse(content)
  } catch {
    // If the model returned non-JSON, return as plain text
    return { overview: content, keyConcepts: [], examQuestions: [] }
  }
}
