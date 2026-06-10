# React with .NET Framework

A demo project using React + TypeScript (built with Vite), .NET Framework 4.8, and ASP.NET MVC 5.

> The frontend was migrated from Angular to React + TypeScript + Vite. The
> ASP.NET MVC 5 backend is unchanged: it serves the single-page app shell from
> `Views/Landing/Index.cshtml`, which loads the built assets from
> `Content/app/browser/`.

## Features

- React 18 + TypeScript - frontend SPA
- Vite - dev server and production bundler
- .NET Framework 4.8
- ASP.NET MVC 5
- Playwright end-to-end tests (Page Object Model)

## Architecture

- The React app lives in [`react-app/`](./react-app).
- `npm run build` (from `react-app/`) bundles the SPA into `Content/app/browser/`
  as `main.js` (a classic, non-module script) and `styles.css`.
- ASP.NET MVC route `""` -> `LandingController.Index` -> `Views/Landing/Index.cshtml`,
  which references `~/Content/app/browser/styles.css` and `~/Content/app/browser/main.js`
  and contains the `<app-root></app-root>` mount element. React mounts into `<app-root>`.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (verified on Node 20; see `.nvmrc`).
- For running the ASP.NET MVC host on Windows:
  - [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) (the free *Community Edition* is sufficient).
  - [.NET Framework 4.8](https://dotnet.microsoft.com/en-us/download/dotnet-framework).

## Getting Started (frontend)

```bash
cd react-app
npm install        # install dependencies
npm run dev        # start the Vite dev server (http://localhost:51267)
```

### Build the SPA for ASP.NET to serve

```bash
cd react-app
npm run build      # outputs to ../Content/app/browser (main.js + styles.css)
```

Then open the solution in Visual Studio and run it (press `F5`). ASP.NET MVC
serves `Views/Landing/Index.cshtml`, which loads the built React assets.

### Lint

```bash
cd react-app
npm run lint
```

### End-to-end tests (Playwright)

```bash
cd react-app
npx playwright install chromium   # first time only
npm run e2e                       # starts the dev server and runs the specs
```

## Continuous Integration

`.github/workflows/react-ci.yml` lints, builds, and runs the Playwright E2E
tests for the React app on every push/PR to `main`.
