// src/services/aiService.js
import fetch from 'node-fetch'

const SUMMARIZE_SYSTEM_PROMPT = `You are an academic study assistant for KalviKonnect.
Analyze the provided notes and return a structured JSON response:
{
  "overview": "3-sentence summary of the main topic",
  "keyConcepts": ["concept1", "concept2", "concept3", "concept4", "concept5"],
  "examQuestions": ["question1", "question2"],
  "difficulty": "beginner|intermediate|advanced"
}
Return ONLY valid JSON. No markdown. No explanation.`

const STRUCTURE_SYSTEM_PROMPT = `You are a placement preparation expert for KalviKonnect.
Given interview rounds and questions, create a structured study plan as JSON:
{
  "studyPlan": [{"round": "string", "focusAreas": ["string"], "timeRequired": "string"}],
  "priorityTopics": ["topic1", "topic2", "topic3"],
  "timeline": "string",
  "tips": ["tip1", "tip2", "tip3"]
}
Return ONLY valid JSON.`

export async function summarizeNote(noteContent, userId) {
  // ❌ No AbortController — hangs indefinitely on slow responses
  // ❌ No try/catch — LLM failure crashes the server
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://kalvikonnect.app',
      'X-Title': 'KalviKonnect'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: SUMMARIZE_SYSTEM_PROMPT },
        { role: 'user', content: noteContent }  // ❌ Empty string goes straight to LLM
      ],
      max_tokens: 600,
      temperature: 0.3
    })
  })

  const data = await response.json()
  // ❌ Will throw if data.choices is missing — crashes server

  const content = data.choices[0].message.content
  try {
    return JSON.parse(content)
  } catch {
    return { overview: content, keyConcepts: [], examQuestions: [], difficulty: 'unknown' }
  }
}

export async function structurePlacement(rounds, questions, jobDescription) {
  // ❌ No AbortController — hangs indefinitely
  // ❌ No try/catch — LLM failure crashes the server
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://kalvikonnect.app',
      'X-Title': 'KalviKonnect'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: STRUCTURE_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Job: ${jobDescription || 'Software Engineer'}\nRounds: ${JSON.stringify(rounds)}\nQuestions: ${JSON.stringify(questions)}`
          // ❌ undefined rounds/questions get serialized as garbage input
        }
      ],
      max_tokens: 800,
      temperature: 0.4
    })
  })

  const data = await response.json()
  const content = data.choices[0].message.content
  try {
    return JSON.parse(content)
  } catch {
    return { studyPlan: [], priorityTopics: [], timeline: 'N/A', tips: [] }
  }
}
