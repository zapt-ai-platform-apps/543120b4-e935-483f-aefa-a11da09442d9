import React, { useState } from 'react';
import PresentationForm from './PresentationForm';
import PresentationContent from './PresentationContent';

export default function MainView() {
    const [presentation, setPresentation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createEvent = async (eventType, payload) => {
        try {
            const response = await fetch(`/api/events/${eventType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in createEvent:', error);
            throw error;
        }
    };

    const handleGenerate = async (topic, slides) => {
        setLoading(true);
        setError('');
        try {
            const result = await createEvent('chatgpt_request', {
                app_id: import.meta.env.VITE_PUBLIC_APP_ID,
                prompt: `Create a presentation on "${topic}" with ${slides} slides. Provide a brief overview for each slide.`,
                response_type: 'json'
            });
            setPresentation(result.data);
        } catch (err) {
            setError('Failed to generate presentation.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <PresentationForm onGenerate={handleGenerate} loading={loading} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {presentation && <PresentationContent content={presentation} />}
        </div>
    );
}