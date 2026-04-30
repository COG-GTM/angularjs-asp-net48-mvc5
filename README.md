# Modern App — ASP.NET Core 9 + Angular 21

A full-stack web application with a **ASP.NET Core 9** backend (Minimal API + SQLite via EF Core) and an **Angular 21** frontend with a CRUD GUI for managing items.

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Backend  | ASP.NET Core 9, Minimal APIs, EF Core, SQLite   |
| Frontend | Angular 21, TypeScript, RxJS                    |
| Testing  | Playwright (E2E with video recording)           |

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/) and npm 9+

## Quick Start

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Build the Angular frontend

```bash
npx ng build
```

This outputs static files to `wwwroot/`, which ASP.NET Core serves automatically.

### 3. Run the backend

```bash
dotnet run --project ModernApp.csproj --urls http://localhost:5000
```

The app is now accessible at **http://localhost:5000**. It serves the Angular SPA and the REST API.

### 4. Verify the API

```bash
curl http://localhost:5000/api/items
```

Returns the 3 seeded items as JSON.

## Development

For frontend development with hot-reload, run the Angular dev server with API proxy:

```bash
# Terminal 1: Start the .NET backend
npm run start:api

# Terminal 2: Start Angular dev server (proxies /api to localhost:5000)
npm start
```

The Angular dev server runs on `http://localhost:4200` and proxies `/api/*` requests to the .NET backend.

## API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/api/items`      | List all items    |
| GET    | `/api/items/:id`  | Get item by ID    |
| POST   | `/api/items`      | Create a new item |
| PUT    | `/api/items/:id`  | Update an item    |
| DELETE | `/api/items/:id`  | Delete an item    |

## E2E Testing

Run Playwright E2E tests with video recording:

```bash
npx playwright install
npx playwright test
```

Videos are saved in `test-results/`. View the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```
├── Data/                  # EF Core models, DbContext, seeder
├── Endpoints/             # Minimal API endpoint definitions
├── Properties/            # Launch settings
├── src/                   # Angular frontend source
│   ├── app/
│   │   ├── components/    # Angular components (item-list, test, test-directive)
│   │   ├── services/      # Angular services (ItemService)
│   │   ├── app.module.ts  # Root NgModule
│   │   ├── app.routes.ts  # Route definitions
│   │   ├── app.ts         # Root component
│   │   └── app.html       # Root template
│   └── index.html         # SPA entry point
├── e2e/                   # Playwright E2E tests
│   ├── tests/             # Test specs
│   └── pages/             # Page objects
├── wwwroot/               # Angular build output (gitignored)
├── ModernApp.csproj       # .NET project file
├── Program.cs             # ASP.NET Core entry point
└── appsettings.json       # .NET configuration
```

## License

[MIT](LICENSE)
