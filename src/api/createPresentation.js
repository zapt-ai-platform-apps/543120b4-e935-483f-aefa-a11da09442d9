import * as Sentry from "@sentry/node";
import { authenticateUser } from "./_apiUtils.js";
import { createEvent } from '../supabaseClient.js';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const user = await authenticateUser(req);

        const { topic, numberOfSlides } = await req.json();

        if (!topic || !numberOfSlides) {
            return res.status(400).json({ error: 'Topic and number of slides are required' });
        }

        const prompt = `Create an outline for a presentation on "${topic}" with ${numberOfSlides} slides. Provide a title and a brief description for each slide.`;

        const result = await createEvent('chatgpt_request', {
            app_id: process.env.VITE_PUBLIC_APP_ID,
            prompt: prompt,
            response_type: 'json'
        });

        if (result.error) {
            throw new Error(result.error);
        }

        res.status(200).json(result);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error:', error);
        if (error.message.includes('Authorization') || error.message.includes('token')) {
            res.status(401).json({ error: 'Authentication failed' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}