import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Serve index.html for any non-asset route so React Router handles 404s. */
function spaFallback(): Plugin {
    const rewrite = (req: { url?: string }, _res: unknown, next: () => void) => {
        if (req.url && !path.extname(req.url)) req.url = '/index.html';
        next();
    };
    return {
        name: 'spa-fallback',
        configureServer: (s) => () => s.middlewares.use(rewrite),
        configurePreviewServer: (s) => () => s.middlewares.use(rewrite),
    };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    spaFallback(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
