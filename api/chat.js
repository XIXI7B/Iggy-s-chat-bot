// This file goes in a folder called "api" at the root of your project.
// On Vercel, any file in /api automatically becomes a live endpoint —
// this one will be reachable at: https://your-project.vercel.app/api/chat

export default async function handler(req, res) {
  // Only allow POST requests (the widget sends messages this way)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, businessContext } = req.body;

  if (!messages || !businessContext) {
    return res.status(400).json({ error: 'Missing messages or businessContext' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // stored securely, never sent to the browser
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5', // check console.anthropic.com for the latest model name
        max_tokens: 1000,
        system: businessContext,
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json({ error: 'AI request failed' });
    }

    const reply = data.content.map(block => block.text || '').join('').trim();
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
