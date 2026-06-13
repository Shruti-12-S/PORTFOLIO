# My Portfolio

A responsive single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- Clear portfolio navigation and recruiter-focused content
- Responsive desktop and mobile layouts
- Animated skills, projects, experience, certifications, and contact sections
- Filterable project gallery
- Dark cyan and violet visual theme

## Project Structure

```text
src/
|-- components/     # Portfolio sections and shared UI
|-- data/           # Profile, skills, projects, achievements, and certifications
|-- App.jsx         # Main page composition
|-- main.jsx        # React entry point
`-- index.css       # Global styles
```

## Getting Started

```bash
npm install
npm run dev
```

The development command starts:

- The React frontend at `http://localhost:5173`
- The contact email API at `http://localhost:3000`

## Contact Form Email Setup

The contact form sends messages through Gmail SMTP. Create a `.env` file from `.env.example`:

```bash
Copy-Item .env.example .env
```

Then replace `SMTP_PASS` with a Google app password:

1. Enable 2-Step Verification on the Google account used by `SMTP_USER`.
2. Create an app password for the portfolio.
3. Put the generated 16-character password in `.env` as `SMTP_PASS`.

Never use your normal Google password or commit `.env`.

To test the configured server:

```bash
npm run dev
```

The API health endpoint is available at `http://localhost:3000/api/health`.

## Deployment

This repository is configured for Vercel through `vercel.json`. Vercel deploys the Vite
frontend to its CDN and the files in `api/` as Node.js Functions.

### Deploy To Vercel

1. Push this project to a GitHub repository. Do not commit `.env`.
2. In Vercel, select **Add New > Project** and import the repository.
3. Vercel detects Vite and reads `vercel.json`.
4. In **Project Settings > Environment Variables**, add these values for Production and Preview:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_SECURE`: `true`
   - `SMTP_USER`: Gmail address used to send messages
   - `SMTP_PASS`: Google app password
   - `CONTACT_TO_EMAIL`: address that receives portfolio messages
5. Deploy the project, then verify `/api/health` returns a successful response.

The Vercel configuration uses:

- Node.js `22.x`
- Build command: `npm run check`
- Output directory: `dist`
- Node.js Functions in `api/`
- Function region: Mumbai (`bom1`)

The contact function sends messages to `CONTACT_TO_EMAIL` and uses the visitor's email as
the reply-to address.

### Manual Node Deployment

For another Node.js-capable host, configure the variables in `.env.example`, then use:

```bash
npm ci --include=dev
npm run check
npm start
```

Set `NODE_ENV=production` in the host dashboard. Production startup fails with a clear error
when the frontend build or required email secrets are missing.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run dev:client` - Start only the Vite frontend
- `npm run dev:server` - Start only the email API
- `npm run build` - Create the production build in `dist/`
- `npm run preview` - Preview the production build
- `npm start` - Run the email API and serve the built frontend from `dist/`
- `npm run lint` - Run ESLint
- `npm run check` - Run lint and create a production build

## Customization

- Update portfolio content in `src/data/`.
- Update visible sections in `src/components/`.
- Update colors and layout styles in `src/index.css`.
- Replace `public/profile/shruti-shinde.jpeg` with your preferred square profile photo.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Icons
