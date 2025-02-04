/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPath from 'vite-tsconfig-paths'

// https://vite.dev/config/

export default defineConfig({
    plugins: [react(), tsConfigPath()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts',
    },
})
