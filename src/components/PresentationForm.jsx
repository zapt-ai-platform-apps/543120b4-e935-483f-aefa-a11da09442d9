import React, { useState } from 'react';

export default function PresentationForm({ onGenerate, loading }) {
    const [topic, setTopic] = useState('');
    const [slides, setSlides] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(topic, slides);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Create Presentation</h2>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="topic">Topic</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded box-border"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="slides">Number of Slides</label>
                <input
                    type="number"
                    id="slides"
                    value={slides}
                    onChange={(e) => setSlides(e.target.value)}
                    min="1"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded box-border"
                    required
                />
            </div>
            <button
                type="submit"
                className={`w-full p-2 bg-blue-500 text-white rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Generate Presentation'}
            </button>
        </form>
    );
}