import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/chat', async (req, res) => {
    // ANTI-PATTERN 7: Generic log, no usage tracking
    console.log('[TutorBot] Chat request received');

    // ANTI-PATTERN 3: Prompt hardcoded inside route handler
    const systemPrompt = "You are TutorBot, a helpful study assistant for programming students. You explain concepts clearly and use examples to illustrate your points. When asked about code, you provide working examples with brief explanations of each part. Keep your responses focused and educational.";

    const { history } = req.body;
    const apiKey = process.env.API_KEY;
    const baseUrl = process.env.LLM_BASE_URL;
    const model = process.env.LLM_MODEL;

    // ANTI-PATTERN 1: Sending full conversation history without windowing
    const messages = [
        { role: 'system', content: systemPrompt },
        ...history
    ];

    // ANTI-PATTERN 4 & 5: Bare fetch (no try/catch) and no timeout/signal
    const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            // ANTI-PATTERN 2: No max_tokens limit
            temperature: 0.7
        })
    });

    const data = await response.json();
    
    // ANTI-PATTERN 7: The 'data.usage' object is completely ignored here
    const content = data.choices[0].message.content;

    res.json({ reply: content });
});

export default router;
