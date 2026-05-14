# Angular + ASP.NET MVC 5

A modern Angular SPA hosted in ASP.NET MVC 5 on .NET Framework 4.8.

## Features

- **Angular 21** single-page application with standalone components and lazy-loaded routes
- **ASP.NET MVC 5** on .NET Framework 4.8 serving the Angular build output
- **Web API 2** JSON endpoints (e.g. `GET /api/sample`)
- **Playwright** end-to-end tests with TypeScript and multi-browser coverage (Chromium, Firefox, WebKit, mobile viewports)
- **Angular CLI** unit tests with Vitest
- **GitHub Actions CI** pipeline for automated build and test

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18 and npm >= 9
- [.NET Framework 4.8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet-framework) (Windows) or [Mono](https://www.mono-project.com/) (Linux/macOS)
- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) (optional, for Windows development)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/COG-GTM/angularjs-asp-net48-mvc5.git
cd angularjs-asp-net48-mvc5

# Install npm dependencies
npm install

# Build the Angular frontend
npx ng build

# Restore NuGet packages and build the .NET backend
nuget restore angularjs-asp-net48-mvc5.sln
# Windows: msbuild angularjs-asp-net48-mvc5.sln
# Linux/macOS: xbuild angularjs-asp-net48-mvc5.sln
```

On Windows, open the solution in Visual Studio and press F5 to run with IIS Express.

## Running Unit Tests

```bash
npx ng test
```

## Running E2E Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install --with-deps

# Run E2E tests (requires the app running on localhost:51267, or set BASE_URL)
BASE_URL=http://localhost:4200/ npx playwright test
```

## Project Structure

```
src/app/                  Angular application source
  app.ts                  Root component (standalone)
  app.routes.ts           Client-side route definitions
  app.html / app.css      Root component template and styles
  components/             Feature components (TestComponent, TestDirectiveComponent)
Controllers/              ASP.NET MVC controllers
  LandingController.cs    Serves the SPA shell
  Api/                    Web API controllers
    SampleApiController.cs  Sample JSON endpoint
App_Start/                ASP.NET configuration
  RouteConfig.cs          MVC routes + SPA catch-all
  WebApiConfig.cs         Web API route registration
Views/Landing/Index.cshtml  Razor view hosting the Angular app
e2e/                      Playwright E2E tests (TypeScript)
  tests/                  Test specs
  pages/                  Page Object Models
.github/workflows/ci.yml  GitHub Actions CI pipeline
```

## API Endpoints

| Method | URL           | Description                    |
|--------|---------------|--------------------------------|
| GET    | `/api/sample` | Returns sample technology data |

## License

[MIT](LICENSE)
