const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are an expert AI coding assistant.
    - Help the user understand, fix, or optimize their code.
    - Always explain clearly and show small code examples.
    - Keep tone friendly, precise, and educational.
  `
});

async function chatService(message, code) {
  const prompt = `
Here is the user's code:
\`\`\`
${code}
\`\`\`

Now the user asks:
"${message}"

Respond as a helpful coding mentor.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = chatService;
