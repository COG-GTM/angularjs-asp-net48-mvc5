# Migration from ASP.NET MVC 5 to ASP.NET Core 7

This document describes the changes made during the migration from ASP.NET MVC 5 (.NET Framework 4.8) to ASP.NET Core 7.

## Overview

The application was migrated from a traditional ASP.NET MVC 5 application to a modern ASP.NET Core 7 application that serves the AngularJS frontend as static files. Since the original application had no API endpoints or business logic, the new architecture is a minimal ASP.NET Core application configured to serve static files.

## Major Changes

### 1. Project File Format
- **Old**: Traditional .csproj format with `packages.config` for NuGet packages
- **New**: SDK-style .csproj format with `PackageReference` for NuGet packages
- **Impact**: Simpler project file, better tooling support, cross-platform compatibility

### 2. Application Bootstrap
- **Old**: `Global.asax` with `Application_Start` method
- **New**: `Program.cs` with modern minimal hosting model
- **Impact**: Simplified configuration, better dependency injection support

### 3. Configuration System
- **Old**: `Web.config` (XML-based)
- **New**: `appsettings.json` and `appsettings.Development.json` (JSON-based)
- **Impact**: More flexible configuration, environment-specific settings support

### 4. Routing and Controllers
- **Old**: MVC routing with `LandingController` returning a Razor view
- **New**: No controllers - serving static `index.html` file
- **Impact**: Simpler architecture, no server-side view rendering needed

### 5. Bundling and Minification
- **Old**: `System.Web.Optimization` with `BundleConfig.cs`
- **New**: Direct script and style references in HTML
- **Impact**: Simpler for small applications, transparent dependency loading

### 6. Static File Structure
- **Old**: Files served from project root with MVC conventions
- **New**: Files served from `wwwroot` directory (ASP.NET Core convention)
- **Impact**: Better separation of web-accessible files

## File Changes

### Created Files
- `Program.cs` - Application entry point and configuration
- `appsettings.json` - Application configuration
- `appsettings.Development.json` - Development-specific configuration
- `wwwroot/index.html` - Main HTML file (converted from `Views/Landing/Index.cshtml`)
- `wwwroot/WebApp/` - AngularJS application files (copied from `WebApp/`)
- `wwwroot/Content/` - CSS files (copied from `Content/`)

### Deleted Files and Directories
- `Global.asax` and `Global.asax.cs` - Replaced by `Program.cs`
- `Web.config` - Replaced by `appsettings.json`
- `packages.config` - Replaced by PackageReference in .csproj
- `App_Start/` directory - No longer needed (routing, bundling removed)
- `Controllers/` directory - No longer needed (static file serving)
- `Views/` directory - Replaced by `wwwroot/index.html`
- `Properties/AssemblyInfo.cs` - Not needed in SDK-style projects

### Modified Files
- `angularjs-asp-net48-mvc5.csproj` - Converted to SDK-style format
- `README.md` - Updated with new setup instructions
- `wwwroot/WebApp/Directives/test.directive.js` - Updated `templateUrl` to include leading slash

## Frontend Changes

The AngularJS application code remains essentially unchanged with one minor modification:

### Template URL Path
In `test.directive.js`, the template URL was updated to include a leading slash:
```javascript
// Old
templateUrl: 'WebApp/Directives/test.directive.html',

// New
templateUrl: '/WebApp/Directives/test.directive.html',
```

This ensures the template loads correctly from the static file server.

## Static File Serving

The application now serves static files from two locations:

1. **wwwroot directory**: Main application files (index.html, WebApp/, Content/)
   - Served at the root path (/)

2. **node_modules directory**: JavaScript dependencies (jQuery, AngularJS)
   - Served at /node_modules/ path
   - Configured via `StaticFileOptions` in `Program.cs`

## Running the Application

### Old Way (.NET Framework 4.8)
```bash
# Open in Visual Studio and press F5
```

### New Way (ASP.NET Core 7)
```bash
# Install dependencies
npm install
dotnet restore

# Run the application
dotnet run

# Navigate to http://localhost:5000 or https://localhost:5001
```

## Benefits of the Migration

1. **Cross-platform**: Can now run on Windows, Linux, and macOS
2. **Modern tooling**: Better IDE support, faster build times
3. **Simplified architecture**: No unnecessary MVC overhead for serving static files
4. **Better performance**: ASP.NET Core has better performance than .NET Framework
5. **Future-proof**: ASP.NET Core is actively developed and supported

## Potential Future Enhancements

If API endpoints are needed in the future, they can be easily added:

1. Add controllers that inherit from `ControllerBase`
2. Register controllers in `Program.cs`:
   ```csharp
   builder.Services.AddControllers();
   app.MapControllers();
   ```
3. Add API routes using `[ApiController]` and `[Route]` attributes
4. Update AngularJS `$http` calls to point to the new API endpoints

## Testing

After migration, verify:
- [x] Application builds successfully with `dotnet build`
- [x] Application runs with `dotnet run`
- [x] Homepage loads at http://localhost:5000
- [x] AngularJS bootstraps correctly (check for "app" module)
- [x] test-directive displays jQuery version
- [x] test-component displays AngularJS version
- [x] No console errors in browser developer tools
- [x] All CSS styles are applied correctly
