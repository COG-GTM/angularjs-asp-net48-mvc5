# Angular with .NET 8
A demo project using Angular, .NET 8, and ASP.NET Core MVC.

## Features

- Angular 21 frontend
- .NET 8 with ASP.NET Core MVC
- Playwright end-to-end tests

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

## Getting Started

- Clone repository: `git clone https://github.com/COG-GTM/angularjs-asp-net48-mvc5.git`.
- Switch to the project's directory: `cd angularjs-asp-net48-mvc5`.
- Install npm packages and build the Angular frontend: `npm install`.
- Run the ASP.NET Core server: `dotnet run`.
- The application will be available at `http://localhost:51267/`.

## Running E2E Tests

Make sure the app is running on port 51267, then in a separate terminal:
```
npm run e2e
```
