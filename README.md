# AngularJS with ASP.NET Core 7

A demo project using AngularJS and ASP.NET Core 7 Web API.

## Features

- XLTS for AngularJS - installed using npm
- jQuery 3.6.3 - installed using npm
- ASP.NET Core 7 Web API
- Static file serving for AngularJS SPA

## Prerequisites

- [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [Node.js 18+](https://nodejs.org/) with npm 9+

## Getting Started

1. Make sure you have configured your authentication with the XLTS.dev registry by supplying your token in the `.npmrc` file in your user home directory.

   > **Note**
   > If you don't have a token for the XLTS.dev registry, you can use the LTS AngularJS packages - see the next section.

2. Clone repository: `git clone https://github.com/COG-GTM/angularjs-asp-net48-mvc5.git`
3. Switch to the project's directory: `cd angularjs-asp-net48-mvc5`
4. Install npm packages: `npm install`
5. Run the application: `dotnet run --project angularjs-aspnetcore7.csproj`
6. Open your browser and navigate to the URL shown in the console (typically `http://localhost:5000` or `https://localhost:5001`)

## AngularJS LTS packages

If you want to use the LTS packages, run `npm run switch-to-lts-packages` script instead of `npm install`.

## API Endpoints

The application includes a sample API endpoint:
- `GET /api/health` - Returns application health status

## Development

To view the Swagger UI for API documentation, navigate to `/swagger` when running in development mode.
