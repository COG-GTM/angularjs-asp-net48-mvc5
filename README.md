# AngularJS with .NET 7
A demo project using AngularJS, .NET 7, and ASP.NET Core MVC.

## Features

- XLTS for AngularJS - installed using npm
- jQuery 3.6.3 - installed using npm
- .NET 7
- ASP.NET Core MVC
- Static file serving for JavaScript and CSS resources

## Prerequisites

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) - Required to build and run the application
- [Node.js 18+](https://nodejs.org/) - Required for npm package management
- Works on Windows, macOS, and Linux

## Getting Started
- Make sure you have configured your authentication with the XLTS.dev registry by supplying your token in the `.npmrc` file in your user home directory.

  > **Note**
  > If you don't have a token for the XLTS.dev registry, you can use the LTS AngularJS packages - see the next section.

- Clone repository: `git clone https://github.com/xlts-dev/angularjs-asp-net48-mvc5.git`.
- Switch to the project's directory: `cd angularjs-asp-net48-mvc5`.
- Install npm packages: `npm install`.
- Build the project: `dotnet build`.
- Run the project: `dotnet run`.
- Open your web browser and navigate to `http://localhost:5000` to view the application.

## AngularJS LTS packages
If you want to use the LTS packages, you have to run `npm run switch-to-lts-packages` script instead of `npm install`.
