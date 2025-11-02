import type { NextApiRequest, NextApiResponse } from 'next';
import { generateSystemPrompt } from '../../lib/systemPrompt';
import portfolioData from '../../dummy.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    // Generate dynamic system prompt with portfolio data
    const systemPrompt = generateSystemPrompt(portfolioData);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              { text: systemPrompt }
            ]
          },
          contents: [
            {
              parts: [
                { text: message }
              ]
            }
          ]
        })
      }
    );
    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response from Gemini.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chatbot API error:', err);
    res.status(500).json({ error: 'Failed to connect to Gemini.' });
  }
} 