# Iggy's Diner AI Chatbot — Deployment Guide

## What's in here
- `index.html` — the chat widget + mock website (calls your backend, not Anthropic directly)
- `api/chat.js` — the serverless function that securely holds your API key

## How to deploy (Vercel, free tier)

1. Get an API key
   - Go to https://console.anthropic.com
   - Sign up, add a small amount of credit (a few dollars covers a lot of chat volume for a small business)
   - Create an API key and copy it

2. Deploy this folder to Vercel
   - Go to https://vercel.com and sign up (free)
   - Install the Vercel CLI: `npm install -g vercel`
   - In this folder, run: `vercel`
   - Follow the prompts (accept defaults is fine for a first deploy)

3. Add your API key as an environment variable
   - In the Vercel dashboard, open your project → Settings → Environment Variables
   - Add a variable named `ANTHROPIC_API_KEY` with your real key as the value
   - Redeploy (Vercel will prompt you, or run `vercel --prod` again)

4. Test it
   - Vercel gives you a live URL like `https://your-project.vercel.app`
   - Open it, and the chat widget should now work anywhere — not just inside Claude

## Reusing this for a new client
- Duplicate this folder
- Edit the CSS variables and text in `index.html` for their branding
- Edit the `businessContext` string in `index.html` with their real info
- Deploy as its own Vercel project (or a new page on their existing site)
- `chat.js` never needs to change — same backend logic works for every client
