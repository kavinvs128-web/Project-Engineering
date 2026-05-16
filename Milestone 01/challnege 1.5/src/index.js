const express = require('express');
const { callAI } = require('./callAI');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// POST /review route
app.post('/review', async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: 'No code content provided' });
    }

    try {
        const promptPath = path.join(__dirname, '../prompts/system-prompt.txt');
        const systemPrompt = fs.readFileSync(promptPath, 'utf8');

        const feedback = await callAI(systemPrompt, code);
        res.json({ feedback });
    } catch (error) {
        console.error('Code review error:', error.message);
        res.status(500).json({ error: 'AI Review failed. Check your API key and network.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
