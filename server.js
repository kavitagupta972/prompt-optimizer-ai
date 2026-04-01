import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/optimize", async (req, res) => {
  const { prompt, type } = req.body;

  const systemPrompt = `
You are a prompt engineering expert.
Rewrite the user's prompt to make it clear, structured, and effective.

Task type: ${type}

Rules:
- Add clarity
- Add structure
- Add constraints
- Keep intent same
`;

  const response = await client.responses.create({
    model: "gpt-5.3",
    input: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ]
  });

  res.json({ optimized: response.output_text });
});

app.listen(5000, () => console.log("Server running"));