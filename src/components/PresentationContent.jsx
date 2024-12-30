import React from 'react';

export default function PresentationContent({ content }) {
    return (
        <div className="mt-6 bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Your Presentation</h2>
            {content.slides.map((slide, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                    <p>{slide}</p>
                </div>
            ))}
        </div>
    );
}