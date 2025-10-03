# AngularJS with ASP.NET Core 7
A demo project using AngularJS with ASP.NET Core 7 as a static file server.

## Features

- XLTS for AngularJS - installed using npm
- jQuery 3.6.3 - installed using npm
- ASP.NET Core 7
- Static file serving for AngularJS SPA

## Prerequisites

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) or later
- [Node.js 18+](https://nodejs.org/) and npm 9+

## Getting Started
- Make sure you have configured your authentication with the XLTS.dev registry by supplying your token in the `.npmrc` file in your user home directory.

  > **Note**
  > If you don't have a token for the XLTS.dev registry, you can use the LTS AngularJS packages - see the next section.

- Clone repository: `git clone https://github.com/COG-GTM/angularjs-asp-net48-mvc5.git`.
- Switch to the project's directory: `cd angularjs-asp-net48-mvc5`.
- Install npm packages: `npm install`.
- Restore .NET packages: `dotnet restore`.
- Run the application: `dotnet run`.
- Open your web browser and navigate to the URL shown in the console (typically http://localhost:5000 or https://localhost:5001).

## AngularJS LTS packages
If you want to use the LTS packages, you have to run `npm run switch-to-lts-packages` script instead of `npm install`.

## Development
- The application serves static files from the `wwwroot` directory
- AngularJS files are located in `wwwroot/WebApp/`
- Styles are in `wwwroot/Content/`
- JavaScript dependencies (jQuery, AngularJS) are served from `node_modules/`
