# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

PREVIEW:

## Gemini demo setup

1. Create a Google AI Studio API key.
2. Copy `.env.example` to `.env.local` and replace the placeholder:

   ```sh
   cp .env.example .env.local
   ```

   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key
   ```

3. Restart the Vite dev server (`npm run dev`) and use **Ask Gemini** in the dashboard.

The app sends requests to Gemini Flash using the browser `fetch()` API. The `VITE_` environment variable is bundled into frontend code and is **not a secret**: browser users can retrieve it. Direct browser access is for a short-lived hackathon demo only. Use a separate low-quota key, restrict it to the Generative Language API and allowed website referrers in Google AI Studio/Cloud Console, and rotate/delete it after the demo. Never commit `.env.local`.

For a public deployment or real users, put the Gemini call behind a server-side endpoint and keep the key in that server's environment; frontend environment variables cannot keep an API key secret.
