import { generateCompletion } from '../services/gptService.js';

export const generateCompletionHandler = async (req, res) => {
  const { message: userMessage, topic, subTopic } = req.body;

  // Validate input
  if (!userMessage || !topic || !subTopic) {
    return res.status(400).json({ error: 'userMessage, topic, and subTopic are required.' });
  }

  try {
    const response = await generateCompletion(userMessage, topic, subTopic);
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating the completion.' });
  }
};
