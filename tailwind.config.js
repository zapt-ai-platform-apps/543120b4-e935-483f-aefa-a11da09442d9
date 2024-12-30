export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1D4ED8',
                secondary: '#2563EB',
                accent: '#3B82F6',
                background: '#F3F4F6',
                text: '#111827'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        },
    },
    plugins: [],
};