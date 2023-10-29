/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                NunitoRegular: ['NunitoRegular', 'sans-serif'],
                NunitoMedium: ['NunitoMedium', 'sans-serif'],
                NunitoBold: ['NunitoBold', 'sans-serif'],
            },
            colors: {},
        },
    },
    plugins: [],
};
