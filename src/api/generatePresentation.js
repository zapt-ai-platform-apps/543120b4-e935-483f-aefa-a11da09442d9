import { createEvent } from '../supabaseClient';
import * as Sentry from '@sentry/node';

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
        const { topic, slides } = req.body;

        if (!topic || !slides) {
            return res.status(400).json({ error: 'Topic and number of slides are required.' });
        }

        const result = await createEvent('chatgpt_request', {
            app_id: process.env.VITE_PUBLIC_APP_ID,
            prompt: `Create a presentation on "${topic}" with ${slides} slides. Provide a brief overview for each slide.`,
            response_type: 'json'
        });

        res.status(200).json(result);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error generating presentation:', error);
        res.status(500).json({ error: 'Failed to generate presentation.' });
    }
}