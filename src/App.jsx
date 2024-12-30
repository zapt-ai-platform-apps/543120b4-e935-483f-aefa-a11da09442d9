import React, { useState, useEffect } from 'react';
import { supabase, createEvent } from './supabaseClient';
import PresentationForm from './components/PresentationForm';
import SignIn from './components/SignIn';
import PresentationDisplay from './components/PresentationDisplay';

export default function App() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [presentation, setPresentation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentSession = supabase.auth.session();
        setSession(currentSession);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    const handleCreatePresentation = async (topic, numberOfSlides) => {
        setLoading(true);
        setError(null);
        setPresentation(null);
        try {
            const prompt = `Create an outline for a presentation on "${topic}" with ${numberOfSlides} slides. Provide a title and a brief description for each slide.`;
            const result = await createEvent('chatgpt_request', {
                app_id: import.meta.env.VITE_PUBLIC_APP_ID,
                prompt: prompt,
                response_type: 'json'
            });

            if (result.error) {
                throw new Error(result.error);
            }

            setPresentation(result);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = () => {
        supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
            <div className="h-full w-full max-w-4xl flex flex-col items-center">
                {!session ? (
                    <SignIn />
                ) : (
                    <div className="w-full">
                        <button
                            className="mb-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                        <PresentationForm onSubmit={handleCreatePresentation} loading={loading} />
                        {error && (
                            <div className="mt-4 text-red-500">
                                {error}
                            </div>
                        )}
                        {presentation && (
                            <PresentationDisplay presentation={presentation} />
                        )}
                    </div>
                )}
                <div className="mt-auto mb-4">
                    <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">
                        Made on ZAPT
                    </a>
                </div>
            </div>
        </div>
    );
}