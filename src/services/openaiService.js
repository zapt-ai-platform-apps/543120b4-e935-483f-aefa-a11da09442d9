export async function generateOpenAIResponse(prompt) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error.message || 'Error generating presentation');
    }

    return data;
}