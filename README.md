# NeuroAI Frontend

React + Vite frontend for:
- Brain tumor detection
- Pneumonia detection
- Driver drowsiness monitoring

## Professional folder structure

- `src/config/`
  - Centralized environment and app config
- `src/services/api/`
  - `client.js`: shared HTTP helpers
  - `predictionService.js`: model-specific API calls
  - `index.js`: service exports
- `src/pages/`
  - Feature pages (BrainTumor, Pneumonia, Drowsiness)
- `src/components/`
  - Reusable UI components
- `src/hooks/`
  - Reusable behavior hooks
- `src/utils/`
  - Utilities (frame capture, audio, legacy API shim)

## Backend wiring

The frontend reads backend base URL from `VITE_API_BASE_URL`.

1. Copy environment template:
   - `cp .env.example .env`
2. Set backend URL in `.env`:
   - Local: `VITE_API_BASE_URL=http://127.0.0.1:8000`
   - Render: `VITE_API_BASE_URL=https://your-backend-name.onrender.com`

## Run locally

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`

## Build

- `npm run build`

## Notes

- Pneumonia model can be replaced later with a lightweight model without frontend code changes, as long as backend endpoint and response schema stay the same.

## Deploy frontend on Netlify

This folder includes `netlify.toml` for frontend-only deployment.
If you deploy from the project root as a monorepo, use the root `netlify.toml`.

1. Create a new site from Git in Netlify.
2. Select this repository.
3. Netlify will use:
  - Base directory: `apps/frontend`
  - Build command: `npm run build`
  - Publish directory: `dist`
4. Set environment variable in Netlify:
  - `VITE_API_BASE_URL=https://YOUR_SPACE_URL`
5. Deploy and verify API calls from the browser.

For full frontend + backend deployment flow, see `docs/deploy-netlify-hf.md`.
