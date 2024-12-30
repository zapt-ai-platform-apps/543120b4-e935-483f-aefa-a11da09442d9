import React, { useState } from 'react';

export default function PresentationForm({ onSubmit, loading }) {
    const [topic, setTopic] = useState('');
    const [numberOfSlides, setNumberOfSlides] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!topic || numberOfSlides <= 0) {
            return;
        }
        onSubmit(topic, numberOfSlides);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Presentation</h2>
            <div className="mb-4">
                <label htmlFor="topic" className="block text-gray-700 mb-2">
                    Topic
                </label>
                <input
                    type="text"
                    id="topic"
                    className="w-full px-3 py-2 border rounded box-border text-gray-900"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter presentation topic"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="slides" className="block text-gray-700 mb-2">
                    Number of Slides
                </label>
                <input
                    type="number"
                    id="slides"
                    className="w-full px-3 py-2 border rounded box-border text-gray-900"
                    value={numberOfSlides}
                    onChange={(e) => setNumberOfSlides(parseInt(e.target.value))}
                    min="1"
                    required
                />
            </div>
            <button
                type="submit"
                className={`w-full px-4 py-2 bg-blue-500 text-white rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Generate Presentation'}
            </button>
        </form>
    );
}