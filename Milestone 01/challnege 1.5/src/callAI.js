const axios = require('axios');

async function callAI(systemPrompt, userCode) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is missing from environment variables');
    }

    const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            model: 'google/gemini-2.0-flash-001',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Analyze the following code for bugs and improvements:\n\n${userCode}` }
            ]
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.choices[0].message.content;
}

module.exports = { callAI };
