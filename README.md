# React + Vite (migrated from Angular)

A demo single-page application built with React 19, TypeScript, and Vite. This
project was migrated from an Angular application (originally an AngularJS + .NET
Framework 4.8 / ASP.NET MVC 5 demo).

## Features

- React 19 + TypeScript
- Vite build tooling
- React Router v6
- PWA support via `vite-plugin-pwa` (service worker + web manifest)
- Light/dark/system theme via a Settings context (persisted to `localStorage`)
- Component & unit tests with Vitest + Testing Library

## Prerequisites

- Node.js 20+
- npm 9+

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Type-check and build for production (outputs to ./dist)
npm run build

# Preview the production build (serves ./dist, exercises the service worker)
npm run preview

# Run the test suite
npm test
```

## Project Structure

```
index.html               Vite entry (SPA host page)
src/
  main.tsx               App bootstrap
  App.tsx                Router + providers + app shell
  index.scss             Global styles + theme classes
  styles/                Shared SCSS variables (design tokens)
  components/            Loader, ErrorMessage, Header, Footer, Settings, ...
  pages/Home/            Landing page (lazy-loaded)
  context/               SettingsContext (theme state)
  hooks/                 usePageTracking (analytics on route change)
  utils/                 Small helpers (e.g. version)
  types/                 Shared TypeScript interfaces
  test/setup.ts          Vitest setup (jest-dom matchers, matchMedia mock)
```

## Notes

The legacy ASP.NET MVC 5 host files remain in the repository for reference. The
frontend is now a standalone Vite SPA whose production assets are emitted to
`dist/`.
