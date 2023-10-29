import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'), // alias as @
        },
    },
    server: {
        open: true, // auto open browser
    },
    build: {
        outDir: 'build', // output dir
    },
    plugins: [react()],
});
