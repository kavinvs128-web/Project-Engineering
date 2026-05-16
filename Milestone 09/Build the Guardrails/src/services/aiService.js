// src/services/aiService.js
import fetch from 'node-fetch'

const SYSTEM_PROMPT = `You are an expert job description analyser. 
Analyse the provided job description and return ONLY a JSON object with these exact fields:
{
  "title": "inferred job title",
  "experienceLevel": "junior OR mid OR senior OR lead",
  "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "responsibilities": ["responsibility1", "responsibility2", "responsibility3"],
  "salaryRange": "estimated range based on role and level, e.g. $80k-$120k",
  "industryType": "inferred industry",
  "remotePolicy": "remote OR hybrid OR onsite OR unspecified"
}
Return ONLY valid JSON. No markdown. No explanation text.`

export async function analyzeJobDescription(text, userId) {
  // ❌ Gap 2: No AbortController — this call can hang indefinitely
  // ❌ Gap 3: No try/catch — any LLM error throws and crashes the server
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
    })
    // ❌ Gap 2: No signal: controller.signal here
  })

  // ❌ Gap 3: If response is an error, data.choices is undefined.
  //           data.choices[0].message.content throws TypeError.
  //           Node.js process exits. Server is down.
  const data = await response.json()

  // Token logging (present — students can see what a working log looks like)
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

  // ❌ Gap 3: This throws if data.choices is missing — no try/catch wraps it
  const content = data.choices[0].message.content

  try {
    return JSON.parse(content)
  } catch {
    return {
      title: 'Unknown',
      experienceLevel: 'unknown',
      requiredSkills: [],
      responsibilities: [],
      salaryRange: 'unspecified',
      industryType: 'unknown',
      remotePolicy: 'unspecified',
      rawContent: content
    }
  }
}
