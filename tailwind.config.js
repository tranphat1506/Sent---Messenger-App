/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                NunitoRegular: ['NunitoRegular', 'sans-serif'],
                NunitoMedium: ['NunitoMedium', 'sans-serif'],
                NunitoBold: ['NunitoBold', 'sans-serif'],
                NunitoBlack: ['NunitoBlack', 'sans-serif'],
            },
            colors: {
                skyBlue: '#35C1F1',
                grayMain: '#0000008a',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
