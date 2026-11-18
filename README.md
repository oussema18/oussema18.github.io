# Oussama Masmoudi — Minimal Portfolio

A clean, responsive portfolio built with React, TypeScript, Vite and Tailwind CSS v4.

## Run locally

Install dependencies:

```powershell
npm.cmd install
```

Start the development server:

```powershell
npm.cmd run dev
```

Build production files:

```powershell
npm.cmd run build
```

## Make it yours

- Update the text, selected work, and skill labels in `src/App.tsx`.
- Adjust colors and layout using Tailwind classes in `src/App.tsx`.
- Update the site title and description in `index.html`.
- Replace the GitHub profile URL if your username changes.
- The project descriptions are intentionally high-level; review them before publishing.

## Deploy on GitHub Pages

1. Use a GitHub repository named `<your-github-username>.github.io`.
2. Put these files in its `main` branch.
3. In the repository settings, under Pages, set the source to **GitHub Actions**.
4. Push your changes; the included workflow builds and deploys `dist`.

For other repo names such as `portfolio`, change `base: '/'` in `vite.config.ts` to `base: '/portfolio/'`.

The repo name in this example assumes the username `oussema18`.
