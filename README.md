# AngularJS with ASP.NET Core 7
A demo project using AngularJS with ASP.NET Core 7 Web API serving static files.

## Features

- AngularJS 1.8.3 (served via CDN)
- jQuery 3.6.3 (served via CDN)
- ASP.NET Core 7 Web API
- Static file serving from wwwroot directory
- CORS configuration for local development
- Cross-platform support (Windows, Linux, macOS)

## Prerequisites

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) or later
- Any text editor or IDE (Visual Studio, Visual Studio Code, JetBrains Rider, etc.)
- Node.js and npm (optional, for running E2E tests and development tools)

## Getting Started

- Clone repository: `git clone https://github.com/COG-GTM/angularjs-asp-net48-mvc5.git`
- Switch to the project's directory: `cd angularjs-asp-net48-mvc5`
- Build the project: `dotnet build`
- Run the project: `dotnet run`
- Open your web browser and navigate to the URL shown in the console output (typically `http://localhost:5000` or `https://localhost:5001`)

## Project Structure

```
├── Program.cs                    # ASP.NET Core application configuration
├── wwwroot/                      # Static files served by the application
│   ├── index.html               # Main HTML file that bootstraps AngularJS
│   ├── Content/                 # CSS files
│   │   └── site.css
│   └── WebApp/                  # AngularJS application files
│       ├── app.js               # Main AngularJS module
│       ├── Components/          # AngularJS components
│       └── Directives/          # AngularJS directives
├── package.json                 # npm dependencies for development tools
└── angularjs-asp-net48-mvc5.csproj  # .NET project file
```

## Development

The application uses ASP.NET Core's static file serving to host the AngularJS frontend. All static files are served from the `wwwroot` directory. The AngularJS application loads jQuery and AngularJS from CDN and includes the custom components and directives.

### Running E2E Tests

If you want to run the Playwright E2E tests:
- Install npm packages: `npm install`
- Run tests: `npm run e2e`
