import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/generate-pr", async (req, res) => {
  const { diff } = req.body;

  if (!diff) {
    return res.status(400).json({ error: "Diff is required" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a senior developer. Convert git diffs into clear PR descriptions."
          },
          {
            role: "user",
            content: `Generate a clean PR description for this diff:\n${diff}`
          }
        ]
      })
    });

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content;

    res.json({ result: output });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
