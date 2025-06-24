const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCompletion = async (userMessage, topic, subTopic) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        { role: "system", content: `Topic: ${topic}, Sub-topic: ${subTopic}` },
        { role: "user", content: userMessage },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate completion: ' + error.message);
  }
};


module.exports = { generateCompletion };

