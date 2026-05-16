import fetch from 'node-fetch'
import 'dotenv/config'

export async function callLLM(systemMsg, userMsg, temperature = 0.7) {
  const apiKey = process.env.API_KEY
  const baseUrl = process.env.LLM_BASE_URL || 'https://api.openai.com/v1'
  const model = process.env.LLM_MODEL || 'gpt-3.5-turbo'

  if (!apiKey) {
    throw new Error('API_KEY is missing from environment variables')
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: userMsg }
      ],
      temperature: parseFloat(temperature)
    })
  })

  const data = await response.json()
  
  if (data.error) {
    throw new Error(`LLM API Error: ${data.error.message}`)
  }

  return data.choices[0].message.content
}
