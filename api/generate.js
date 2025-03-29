export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 300
    })
  });

  const data = await response.json();
  res.status(200).json({ message: data.choices?.[0]?.message?.content });
}
