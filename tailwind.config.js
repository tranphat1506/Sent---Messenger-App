/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                MP_Regular: ['MP_Regular', 'sans-serif'],
                MP_Medium: ['MP_Medium', 'sans-serif'],
                MP_Bold: ['MP_Bold', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
