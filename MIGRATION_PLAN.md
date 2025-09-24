# Migration Plan: .NET Framework 4.8 to .NET 7

## Overview

This document provides a detailed step-by-step migration plan for upgrading the ASP.NET MVC 5 application from .NET Framework 4.8 to .NET 7. This is a significant migration that involves moving from the legacy .NET Framework to modern .NET, requiring changes to project structure, hosting model, and package references while preserving the AngularJS frontend functionality.

## Current Application Analysis

### Current Architecture
- **Framework**: .NET Framework 4.8
- **Web Framework**: ASP.NET MVC 5.2.7
- **Project Format**: Legacy MSBuild format (.csproj)
- **Hosting**: IIS Express / IIS with System.Web
- **Bundling**: System.Web.Optimization with WebGrease
- **Frontend**: AngularJS 1.8.3 with jQuery 3.6.3
- **Configuration**: Web.config XML-based configuration

### Key Files to Migrate
- `angularjs-asp-net48-mvc5.csproj` (legacy format)
- `Global.asax.cs` (application startup)
- `Web.config` (configuration)
- `App_Start/BundleConfig.cs` (asset bundling)
- `Controllers/LandingController.cs` (MVC controller)
- `Views/Landing/Index.cshtml` (Razor view)

## Migration Plan

### Phase 1: Project File Format Migration

#### 1.1 Convert to SDK-Style Project Format

**Current (Legacy Format):**
```xml
<Project ToolsVersion="15.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup>
    <TargetFrameworkVersion>v4.8</TargetFrameworkVersion>
    <UseIISExpress>true</UseIISExpress>
    <ProjectTypeGuids>{349c5851-65df-11da-9384-00065b846f21};{fae04ec0-301f-11d3-bf4b-00c04f79efbc}</ProjectTypeGuids>
  </PropertyGroup>
  <ItemGroup>
    <Reference Include="System.Web.Mvc, Version=5.2.7.0...">
      <HintPath>packages\Microsoft.AspNet.Mvc.5.2.7\lib\net45\System.Web.Mvc.dll</HintPath>
    </Reference>
    <!-- Many more package references -->
  </ItemGroup>
</Project>
```

**New (SDK-Style Format):**
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <RootNamespace>asp_net_angularjs</RootNamespace>
    <AssemblyName>asp-net-angularjs</AssemblyName>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc" Version="2.2.0" />
    <PackageReference Include="Microsoft.AspNetCore.StaticFiles" Version="2.2.0" />
    <PackageReference Include="WebOptimizer.Core" Version="3.0.372" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="WebApp\**\*" CopyToOutputDirectory="PreserveNewest" />
    <Content Include="node_modules\jquery\dist\jquery.min.js" CopyToOutputDirectory="PreserveNewest" />
    <Content Include="node_modules\angular\angular.min.js" CopyToOutputDirectory="PreserveNewest" />
  </ItemGroup>
</Project>
```

#### 1.2 Remove Legacy Files
- Delete `packages.config` (replaced by PackageReference)
- Delete `Web.config` (replaced by appsettings.json)
- Delete `Global.asax` and `Global.asax.cs` (replaced by Program.cs/Startup.cs)

### Phase 2: Package Reference Updates

#### 2.1 Core Framework Packages

| .NET Framework 4.8 Package | .NET 7 Equivalent | Notes |
|----------------------------|-------------------|-------|
| `Microsoft.AspNet.Mvc` 5.2.7 | Built into `Microsoft.NET.Sdk.Web` | Core MVC functionality |
| `System.Web.Optimization` 1.1.3 | `WebOptimizer.Core` 3.0.372 | Modern bundling and minification |
| `WebGrease` 1.5.2 | Built into WebOptimizer | CSS/JS optimization |
| `Microsoft.AspNet.WebPages` 3.2.7 | Built into ASP.NET Core | Razor view engine |
| `Newtonsoft.Json` 13.0.1 | `System.Text.Json` (built-in) | JSON serialization |

#### 2.2 Removed Dependencies
These packages are no longer needed in .NET 7:
- `Microsoft.Web.Infrastructure`
- `Microsoft.CodeDom.Providers.DotNetCompilerPlatform`
- `Antlr3.Runtime`
- All `System.Web.*` assemblies

### Phase 3: Application Architecture Changes

#### 3.1 Replace Global.asax with Program.cs

**Current (Global.asax.cs):**
```csharp
public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        AreaRegistration.RegisterAllAreas();
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
    }
}
```

**New (Program.cs):**
```csharp
using WebOptimizer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();
builder.Services.AddWebOptimizer(pipeline =>
{
    // Configure bundling (see section 3.3)
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseWebOptimizer();

app.UseRouting();

app.MapControllerRoute(
    name: "Landing",
    pattern: "",
    defaults: new { controller = "Landing", action = "Index" });

app.Run();
```

#### 3.2 Convert Web.config to appsettings.json

**Current (Web.config):**
```xml
<configuration>
  <appSettings>
    <add key="webpages:Version" value="3.0.0.0"/>
    <add key="webpages:Enabled" value="false"/>
    <add key="ClientValidationEnabled" value="true"/>
    <add key="UnobtrusiveJavaScriptEnabled" value="true"/>
  </appSettings>
  <system.web>
    <compilation debug="true" targetFramework="4.8"/>
    <httpRuntime targetFramework="4.8"/>
  </system.web>
</configuration>
```

**New (appsettings.json):**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "WebPages": {
    "Version": "3.0.0.0",
    "Enabled": false
  },
  "ClientValidation": {
    "Enabled": true,
    "UnobtrusiveJavaScript": true
  }
}
```

#### 3.3 Update Bundling Configuration

**Current (BundleConfig.cs):**
```csharp
public static void RegisterBundles(BundleCollection bundles)
{
    bundles.Add(new ScriptBundle("~/bundles/scripts")
        .Include("~/node_modules/jquery/dist/jquery.min.js")
        .Include("~/node_modules/angular/angular.min.js")
        .IncludeDirectory("~/WebApp", "*.js", false)
        .IncludeDirectory("~/WebApp/Components", "*.js", true)
        .IncludeDirectory("~/WebApp/Directives", "*.js", true));

    bundles.Add(new StyleBundle("~/bundles/styles")
        .IncludeDirectory("~/Content", "*.css", true)
        .IncludeDirectory("~/WebApp", "*.css", true));
}
```

**New (Program.cs WebOptimizer configuration):**
```csharp
builder.Services.AddWebOptimizer(pipeline =>
{
    // JavaScript bundle
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/app.js",
        "WebApp/Components/*.js",
        "WebApp/Directives/*.js");

    // CSS bundle
    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/*.css",
        "WebApp/**/*.css");
});
```

#### 3.4 Update Controller

**Current (LandingController.cs):**
```csharp
using System.Web.Mvc;

namespace asp_net_angularjs.Controllers
{
    public class LandingController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
```

**New (LandingController.cs):**
```csharp
using Microsoft.AspNetCore.Mvc;

namespace asp_net_angularjs.Controllers
{
    public class LandingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
```

#### 3.5 Update Razor View

**Current (Index.cshtml):**
```html
@using System.Web.Optimization
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width" />
    <title>XLTS for AngularJS with .NET Framework</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    @Styles.Render("~/bundles/styles")
    @Scripts.Render("~/bundles/scripts")
</head>
<body ng-app="app">
    <h1 data-testid="title">XLTS for AngularJS with .NET Framework</h1>
    <test-directive></test-directive>
    <test-component></test-component>
</body>
</html>
```

**New (Index.cshtml):**
```html
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width" />
    <title>XLTS for AngularJS with .NET 7</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/bundles/styles.css" />
</head>
<body ng-app="app">
    <h1 data-testid="title">XLTS for AngularJS with .NET 7</h1>
    <test-directive></test-directive>
    <test-component></test-component>
    <script src="/bundles/scripts.js"></script>
</body>
</html>
```

### Phase 4: Hosting Model Changes

#### 4.1 Development Server Configuration

**Current**: IIS Express with `http://localhost:51267/`

**New**: Kestrel development server
- Default ports: HTTP 5000, HTTPS 5001
- Configure in `Properties/launchSettings.json`:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

#### 4.2 Production Hosting Options

1. **IIS with ASP.NET Core Module**
   - Install ASP.NET Core Runtime on server
   - Configure `web.config` for IIS:
   ```xml
   <configuration>
     <system.webServer>
       <handlers>
         <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
       </handlers>
       <aspNetCore processPath="dotnet" arguments=".\asp-net-angularjs.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
     </system.webServer>
   </configuration>
   ```

2. **Self-hosted with Kestrel**
   - Direct deployment with `dotnet run`
   - Reverse proxy with nginx/Apache

### Phase 5: Client-Side Integration Preservation

#### 5.1 AngularJS Frontend Compatibility

The AngularJS frontend code requires no changes:
- `WebApp/app.js` - Main AngularJS module
- `WebApp/Components/` - AngularJS components
- `WebApp/Directives/` - AngularJS directives
- `package.json` - npm dependencies remain the same

#### 5.2 Static File Serving

Configure static file serving in `Program.cs`:
```csharp
app.UseStaticFiles(); // Serves wwwroot by default

// Serve node_modules for development
if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, "node_modules")),
        RequestPath = "/node_modules"
    });
}
```

#### 5.3 Update File Structure

Move static assets to follow ASP.NET Core conventions:
```
Before:
├── Content/site.css
├── WebApp/
└── node_modules/

After:
├── wwwroot/
│   ├── css/site.css (moved from Content/)
│   ├── js/ (for custom scripts)
│   └── lib/ (for vendor libraries)
├── WebApp/ (unchanged)
└── node_modules/ (unchanged, served in development)
```

### Phase 6: Migration Sequence

#### Step 1: Backup and Preparation
1. Create a new branch: `git checkout -b migration/dotnet7`
2. Backup current working application
3. Document current functionality for testing

#### Step 2: Project File Migration
1. Create new SDK-style `.csproj` file
2. Remove `packages.config`
3. Test that project loads in Visual Studio/VS Code

#### Step 3: Application Startup Migration
1. Create `Program.cs` with minimal configuration
2. Delete `Global.asax` and `Global.asax.cs`
3. Create `appsettings.json`
4. Delete `Web.config`

#### Step 4: Controller and View Updates
1. Update controller base class and return types
2. Update view to use new bundling approach
3. Configure static file serving

#### Step 5: Bundling Migration
1. Install WebOptimizer packages
2. Configure bundling in `Program.cs`
3. Update view references to new bundle URLs

#### Step 6: Testing and Validation
1. Verify application starts without errors
2. Test AngularJS functionality works
3. Verify bundling and minification
4. Test in both development and production modes

#### Step 7: Deployment Configuration
1. Create `launchSettings.json`
2. Configure production hosting (IIS or Kestrel)
3. Update deployment scripts/CI/CD

### Phase 7: Testing Checkpoints

#### Checkpoint 1: Project Loads
- [ ] New project file loads in IDE
- [ ] No compilation errors
- [ ] Dependencies resolve correctly

#### Checkpoint 2: Application Starts
- [ ] Application starts without errors
- [ ] Kestrel server runs on expected port
- [ ] Static files are served correctly

#### Checkpoint 3: Frontend Functionality
- [ ] AngularJS application bootstraps
- [ ] Components and directives render
- [ ] JavaScript bundles load correctly
- [ ] CSS styles apply correctly

#### Checkpoint 4: Production Ready
- [ ] Application runs in Release mode
- [ ] Bundling and minification work
- [ ] Performance is acceptable
- [ ] Deployment process works

## Potential Issues and Solutions

### Issue 1: Missing System.Web Dependencies
**Problem**: Code references `System.Web.HttpContext` or similar
**Solution**: Replace with `Microsoft.AspNetCore.Http.HttpContext`

### Issue 2: Bundle Path Changes
**Problem**: Frontend expects specific bundle URLs
**Solution**: Configure WebOptimizer to match original URLs or update frontend

### Issue 3: Configuration Access
**Problem**: Code reads from `ConfigurationManager.AppSettings`
**Solution**: Use dependency injection with `IConfiguration`

### Issue 4: Session State
**Problem**: Application uses `Session` state
**Solution**: Configure session services in `Program.cs`

### Issue 5: Custom HTTP Modules/Handlers
**Problem**: Web.config defines custom modules
**Solution**: Convert to ASP.NET Core middleware

## Performance Considerations

1. **Startup Time**: .NET 7 has faster startup than .NET Framework
2. **Memory Usage**: Generally lower memory footprint
3. **Request Throughput**: Significantly higher with Kestrel
4. **Bundle Size**: WebOptimizer may produce different bundle sizes

## Security Updates

1. **HTTPS by Default**: ASP.NET Core enforces HTTPS in production
2. **Security Headers**: Built-in security header middleware
3. **CSRF Protection**: Update anti-forgery token implementation
4. **Content Security Policy**: Consider implementing CSP headers

## Rollback Plan

1. Keep original .NET Framework version in separate branch
2. Maintain parallel deployment capability during transition
3. Document configuration differences for quick rollback
4. Test rollback procedure before production deployment

## Timeline Estimate

- **Phase 1-2 (Project & Packages)**: 1-2 days
- **Phase 3 (Architecture Changes)**: 2-3 days  
- **Phase 4-5 (Hosting & Frontend)**: 1-2 days
- **Phase 6 (Migration Execution)**: 1 day
- **Phase 7 (Testing & Validation)**: 2-3 days
- **Total**: 7-11 days

## Success Criteria

1. Application runs on .NET 7 without errors
2. All AngularJS functionality preserved
3. Performance equal or better than original
4. Deployment process updated and tested
5. Development workflow improved
6. All tests pass (unit, integration, E2E)

---

*This migration plan should be reviewed and adjusted based on specific organizational requirements and constraints.*
