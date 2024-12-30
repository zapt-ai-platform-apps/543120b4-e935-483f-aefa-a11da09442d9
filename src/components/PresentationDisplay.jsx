import React from 'react';

export default function PresentationDisplay({ presentation }) {
    return (
        <div className="mt-6 bg-white p-6 rounded shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Generated Presentation</h3>
            {presentation.slides.map((slide, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-xl font-semibold">
                        Slide {index + 1}: {slide.title}
                    </h4>
                    <p className="mt-2 text-gray-700">{slide.description}</p>
                </div>
            ))}
        </div>
    );
}