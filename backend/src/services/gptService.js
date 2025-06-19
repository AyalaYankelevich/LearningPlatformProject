const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCompletion = async (userMessage, topic, subTopic) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Ensure this is a valid model name
      store: true,
      messages: [
        { role: "system", content: `Topic: ${topic}, Sub-topic: ${subTopic}` }, // Add topic and sub-topic as context
        { role: "user", content: userMessage },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate completion: ' + error.message);
  }
};

// Export the function
module.exports = { generateCompletion };

