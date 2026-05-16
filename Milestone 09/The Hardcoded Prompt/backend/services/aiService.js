import fetch from 'node-fetch';

export async function callAI(prompt, systemMsg) {
  try {
    const response = await fetch(`${process.env.LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL,
        messages: [
          { role: 'system', content: systemMsg },
          { role: 'user', content: prompt }
        ]
        // deliberately omitting temperature for default (inconsistent) behavior
      })
    });

    const data = await response.json();
    
    // NO JSON parsing, extracts only the raw content
    return data.choices[0].message.content;
  } catch (error) {
    return 'AI request failed';
  }
}
