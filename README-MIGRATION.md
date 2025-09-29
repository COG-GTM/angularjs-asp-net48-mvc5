# ASP.NET Core 7 Web API Migration

This document describes the migration from ASP.NET MVC 5 (.NET Framework 4.8) to ASP.NET Core 7 Web API.

## Migration Summary

### What Changed
- **Project File**: Migrated from legacy `.csproj` format to modern SDK-style project (`AspNetCore.WebApi.csproj`)
- **Configuration**: Replaced `Web.config` with `appsettings.json`
- **Application Startup**: Replaced `Global.asax.cs` with `Program.cs`
- **Controllers**: Converted from MVC Controllers returning Views to API Controllers returning JSON
- **Static Files**: Replaced ASP.NET bundling with direct static file serving
- **Frontend Integration**: Converted Razor view to static HTML file

### New Project Structure
```
AspNetCore.WebApi.csproj    # New SDK-style project file
Program.cs                  # Application entry point and configuration
appsettings.json           # Application configuration
Controllers/
  ├── ApiController.cs     # General API endpoints
  └── LandingApiController.cs # Landing-specific API endpoints
wwwroot/
  └── index.html          # Static HTML file (converted from Index.cshtml)
```

### Running the New Application

1. **Build the project**:
   ```bash
   dotnet build AspNetCore.WebApi.csproj
   ```

2. **Run the application**:
   ```bash
   dotnet run --project AspNetCore.WebApi.csproj
   ```

3. **Access the application**:
   - Frontend: `http://localhost:5000` (or the port shown in console)
   - API endpoints:
     - `http://localhost:5000/api/api/version`
     - `http://localhost:5000/api/api/health`
     - `http://localhost:5000/api/landingapi/config`

### Frontend Changes Required

**None!** The AngularJS frontend remains completely unchanged. The migration maintains compatibility by:

1. **Static File Serving**: All frontend assets (JavaScript, CSS, HTML) are served as static files
2. **CORS Configuration**: Enables cross-origin requests from the frontend
3. **Path Mapping**: Maintains the same file paths for all frontend resources

### API Endpoints

The new Web API provides these endpoints for future frontend integration:

- `GET /api/api/version` - Returns application version information
- `GET /api/api/health` - Returns health status
- `GET /api/landingapi/config` - Returns configuration data for the landing page

### Key Technical Changes

1. **Dependency Injection**: Uses built-in ASP.NET Core DI container
2. **Middleware Pipeline**: Configured in `Program.cs` with static files, CORS, and routing
3. **Static File Serving**: Serves files from `WebApp/`, `Content/`, and `node_modules/` directories
4. **CORS Policy**: "AllowAngularJS" policy allows all origins, methods, and headers

### Database Connections

No database connections existed in the original application, so none were migrated.

### External Dependencies

The application has no external service dependencies beyond the npm packages for the frontend.

### Development Workflow

1. Use `dotnet build` instead of MSBuild
2. Use `dotnet run` instead of IIS Express
3. Configuration changes go in `appsettings.json` instead of `Web.config`
4. Add new API endpoints by creating controllers that inherit from `ControllerBase`

### Deployment Considerations

- Target runtime: .NET 7.0
- Deployment model: Self-contained or framework-dependent
- Static files are served directly by Kestrel
- CORS is configured for development (consider restricting origins in production)
