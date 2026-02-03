# .NET Framework 4.8 to .NET 8 Migration Plan

This document provides a comprehensive migration plan for upgrading the ASP.NET MVC 5 application from .NET Framework 4.8 to .NET 8. The application is a hybrid web application combining ASP.NET MVC 5 on the backend with an AngularJS frontend.

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Breaking Changes](#breaking-changes)
3. [Deprecated APIs](#deprecated-apis)
4. [Dependencies Requiring Replacement](#dependencies-requiring-replacement)
5. [Migration Steps in Priority Order](#migration-steps-in-priority-order)
6. [File-by-File Migration Guide](#file-by-file-migration-guide)
7. [Testing Strategy](#testing-strategy)
8. [Rollback Plan](#rollback-plan)

---

## Executive Summary

This migration involves transitioning from the legacy ASP.NET MVC 5 framework running on .NET Framework 4.8 to ASP.NET Core MVC running on .NET 8. This is not a simple upgrade but rather a significant architectural change, as ASP.NET Core is a complete rewrite of the ASP.NET framework with different APIs, hosting models, and configuration systems.

The migration will require changes to the project structure, configuration files, dependency management, and application code. The AngularJS frontend can remain largely unchanged, though the way static files are served will need to be updated.

**Estimated Total Effort:** 2-4 weeks for a developer familiar with both frameworks

**Risk Level:** Medium-High (due to fundamental architectural differences)

---

## Breaking Changes

### 1. System.Web Namespace Removal

**Priority:** High  
**Complexity:** High

The entire `System.Web` namespace does not exist in .NET Core/.NET 8. This is the most significant breaking change as it affects nearly every aspect of the application.

**Current Usage in This Application:**
- `System.Web.Mvc` - Controller base class, ActionResult, view rendering
- `System.Web.Routing` - Route configuration
- `System.Web.Optimization` - Bundling and minification
- `System.Web.HttpApplication` - Application lifecycle (Global.asax)

**Replacement Approach:**

| .NET Framework 4.8 | .NET 8 Replacement |
|-------------------|-------------------|
| `System.Web.Mvc.Controller` | `Microsoft.AspNetCore.Mvc.Controller` |
| `System.Web.Mvc.ActionResult` | `Microsoft.AspNetCore.Mvc.IActionResult` |
| `System.Web.Routing.RouteCollection` | `Microsoft.AspNetCore.Routing` with endpoint routing |
| `System.Web.HttpApplication` | `WebApplication` in Program.cs |
| `System.Web.Optimization` | Third-party bundlers or built-in static file middleware |

### 2. ASP.NET MVC 5 to ASP.NET Core MVC Migration

**Priority:** High  
**Complexity:** High

ASP.NET Core MVC has a different architecture and API surface compared to ASP.NET MVC 5.

**Key Differences:**

The controller base class changes from `System.Web.Mvc.Controller` to `Microsoft.AspNetCore.Mvc.Controller`. While the basic patterns remain similar, there are subtle differences in how dependency injection works, how action results are returned, and how model binding operates.

Action methods that return `ActionResult` should now return `IActionResult` or specific result types like `ViewResult`. The `View()` method still exists but is now part of the ASP.NET Core controller base class.

**Example - Current Controller:**
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

**Example - Migrated Controller:**
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

### 3. Configuration System Changes

**Priority:** High  
**Complexity:** Medium

The configuration system changes fundamentally from XML-based Web.config to JSON-based appsettings.json with a new configuration API.

**Current Configuration (Web.config):**
```xml
<appSettings>
    <add key="webpages:Version" value="3.0.0.0"/>
    <add key="ClientValidationEnabled" value="true"/>
</appSettings>
```

**New Configuration (appsettings.json):**
```json
{
    "AppSettings": {
        "ClientValidationEnabled": true
    }
}
```

**Breaking Changes:**
- `ConfigurationManager.AppSettings` is replaced by `IConfiguration`
- Connection strings are accessed differently
- Configuration transforms (Web.Debug.config, Web.Release.config) are replaced by environment-specific appsettings files (appsettings.Development.json, appsettings.Production.json)
- Assembly binding redirects are no longer needed (handled automatically by the runtime)

### 4. Global.asax.cs Replacement

**Priority:** High  
**Complexity:** Medium

The `Global.asax.cs` file and `HttpApplication` class do not exist in ASP.NET Core. Application startup is handled through `Program.cs` using the minimal hosting model.

**Current Global.asax.cs:**
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

**New Program.cs:**
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
```

### 5. Bundling and Optimization Framework Changes

**Priority:** High  
**Complexity:** Medium

`System.Web.Optimization` (the bundling and minification framework) does not exist in ASP.NET Core. The `@Styles.Render()` and `@Scripts.Render()` helper methods are not available.

**Current Bundling (BundleConfig.cs):**
```csharp
bundles.Add(new ScriptBundle("~/bundles/scripts")
    .Include("~/node_modules/jquery/dist/jquery.min.js")
    .Include("~/node_modules/angular/angular.min.js")
    .IncludeDirectory("~/WebApp", "*.js", false));
```

**Replacement Options:**

Option 1 - Use WebOptimizer (recommended for similar experience):
```csharp
// In Program.cs
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/**/*.js");
    
    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/**/*.css",
        "WebApp/**/*.css");
});
```

Option 2 - Use npm-based bundlers (Webpack, Vite, esbuild):
This approach moves bundling to the frontend build process, which is more aligned with modern web development practices.

Option 3 - Use LibMan (Library Manager) for simple scenarios:
For applications that don't need complex bundling, LibMan can manage client-side libraries.

### 6. Razor View Engine Differences

**Priority:** Medium  
**Complexity:** Medium

While Razor syntax remains largely the same, there are differences in how views are configured and what helper methods are available.

**Breaking Changes:**
- `@Styles.Render()` and `@Scripts.Render()` are not available (part of System.Web.Optimization)
- View imports are configured in `_ViewImports.cshtml` instead of `Views/web.config`
- The `@using System.Web.Optimization` directive must be removed
- Layout file location conventions may differ

**Current View (Index.cshtml):**
```cshtml
@using System.Web.Optimization
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
<head>
    @Styles.Render("~/bundles/styles")
    @Scripts.Render("~/bundles/scripts")
</head>
```

**Migrated View (Index.cshtml):**
```cshtml
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="~/bundles/styles.css" />
    <script src="~/bundles/scripts.js"></script>
</head>
```

### 7. Routing Changes

**Priority:** Medium  
**Complexity:** Low

ASP.NET Core uses endpoint routing instead of the older route table approach. While attribute routing works similarly, conventional routing is configured differently.

**Current Routing (RouteConfig.cs):**
```csharp
public static void RegisterRoutes(RouteCollection routes)
{
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
    routes.MapRoute(
        name: "Landing",
        url: "",
        defaults: new { controller = "Landing", action = "Index", id = UrlParameter.Optional }
    );
}
```

**New Routing (Program.cs):**
```csharp
app.MapControllerRoute(
    name: "Landing",
    pattern: "",
    defaults: new { controller = "Landing", action = "Index" });

// Or use the default pattern
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");
```

---

## Deprecated APIs

### 1. System.Web.Optimization APIs

**Status:** Not available in .NET Core/.NET 8  
**Impact:** High

| Deprecated API | Replacement |
|---------------|-------------|
| `BundleCollection` | WebOptimizer or npm bundlers |
| `BundleTable.Bundles` | WebOptimizer pipeline |
| `ScriptBundle` | WebOptimizer `AddJavaScriptBundle` |
| `StyleBundle` | WebOptimizer `AddCssBundle` |
| `@Styles.Render()` | Direct `<link>` tags or Tag Helpers |
| `@Scripts.Render()` | Direct `<script>` tags or Tag Helpers |

### 2. System.Web.Mvc APIs

**Status:** Replaced by Microsoft.AspNetCore.Mvc  
**Impact:** High

| Deprecated API | Replacement |
|---------------|-------------|
| `System.Web.Mvc.Controller` | `Microsoft.AspNetCore.Mvc.Controller` |
| `System.Web.Mvc.ActionResult` | `Microsoft.AspNetCore.Mvc.IActionResult` |
| `System.Web.Mvc.ViewResult` | `Microsoft.AspNetCore.Mvc.ViewResult` |
| `System.Web.Mvc.AreaRegistration` | Area configuration in Program.cs |
| `System.Web.Mvc.HtmlHelper` | Tag Helpers or `IHtmlHelper` |
| `System.Web.Mvc.UrlHelper` | `IUrlHelper` |

### 3. HttpApplication Lifecycle Methods

**Status:** Not available in .NET Core/.NET 8  
**Impact:** Medium

| Deprecated Method | Replacement |
|------------------|-------------|
| `Application_Start` | `Program.cs` / `Startup.cs` configuration |
| `Application_End` | `IHostApplicationLifetime.ApplicationStopping` |
| `Application_Error` | Exception handling middleware |
| `Application_BeginRequest` | Custom middleware |
| `Application_EndRequest` | Custom middleware |
| `Session_Start` | Session middleware configuration |
| `Session_End` | Not directly available (use distributed cache) |

### 4. Configuration APIs

**Status:** Replaced by new configuration system  
**Impact:** Medium

| Deprecated API | Replacement |
|---------------|-------------|
| `ConfigurationManager.AppSettings` | `IConfiguration` |
| `ConfigurationManager.ConnectionStrings` | `IConfiguration.GetConnectionString()` |
| `WebConfigurationManager` | `IConfiguration` |
| Web.config transforms | Environment-specific appsettings files |

### 5. System.Web.Razor APIs

**Status:** Replaced by Microsoft.AspNetCore.Mvc.Razor  
**Impact:** Low

| Deprecated API | Replacement |
|---------------|-------------|
| `System.Web.Razor` | `Microsoft.AspNetCore.Razor` |
| `System.Web.WebPages.Razor` | Built-in Razor support |
| `MvcWebRazorHostFactory` | Not needed |
| `WebViewPage` | `RazorPage` |

### 6. System.Web.Helpers

**Status:** Partially available via compatibility packages  
**Impact:** Low (not heavily used in this application)

| Deprecated API | Replacement |
|---------------|-------------|
| `System.Web.Helpers.Json` | `System.Text.Json` or `Newtonsoft.Json` |
| `System.Web.Helpers.WebGrid` | Third-party grid components |
| `System.Web.Helpers.WebImage` | `System.Drawing` or ImageSharp |
| `System.Web.Helpers.Crypto` | `Microsoft.AspNetCore.Cryptography` |

---

## Dependencies Requiring Replacement

### 1. Antlr (Version 3.5.0.2)

**Compatibility:** Not directly compatible  
**Replacement:** Not needed in .NET 8

This package was a dependency of WebGrease for CSS/JS minification. Since WebGrease is being replaced, Antlr is no longer needed.

**Action:** Remove from project. If ANTLR parsing is needed for other purposes, use ANTLR4 NuGet package.

### 2. Microsoft.AspNet.Mvc (Version 5.2.7)

**Compatibility:** Not compatible with .NET 8  
**Replacement:** `Microsoft.AspNetCore.Mvc` (included in ASP.NET Core framework)

**Action:** Remove package reference. MVC functionality is included in the ASP.NET Core framework via `builder.Services.AddControllersWithViews()`.

### 3. Microsoft.AspNet.Razor (Version 3.2.7)

**Compatibility:** Not compatible with .NET 8  
**Replacement:** Built-in Razor support in ASP.NET Core

**Action:** Remove package reference. Razor is included in ASP.NET Core by default.

### 4. Microsoft.AspNet.Web.Optimization (Version 1.1.3)

**Compatibility:** Not compatible with .NET 8  
**Replacement:** One of the following options:

| Option | Package | Notes |
|--------|---------|-------|
| WebOptimizer | `LigerShark.WebOptimizer.Core` | Similar API to System.Web.Optimization |
| BuildBundlerMinifier | `BuildBundlerMinifier` | Build-time bundling |
| Webpack/Vite | npm packages | Modern frontend tooling |

**Recommended Action:** Install `LigerShark.WebOptimizer.Core` for the most straightforward migration path.

### 5. Microsoft.AspNet.WebPages (Version 3.2.7)

**Compatibility:** Not compatible with .NET 8  
**Replacement:** Built-in Razor Pages support in ASP.NET Core

**Action:** Remove package reference. If using Razor Pages features, they are included in ASP.NET Core.

### 6. Microsoft.CodeDom.Providers.DotNetCompilerPlatform (Version 3.6.0)

**Compatibility:** Not needed in .NET 8  
**Replacement:** None required

This package provided Roslyn compiler support for .NET Framework. .NET 8 uses Roslyn by default.

**Action:** Remove package reference.

### 7. Microsoft.Web.Infrastructure (Version 1.0.0.0)

**Compatibility:** Not compatible with .NET 8  
**Replacement:** None required

This package provided infrastructure for ASP.NET modules. ASP.NET Core uses middleware instead.

**Action:** Remove package reference.

### 8. Newtonsoft.Json (Version 13.0.1)

**Compatibility:** Fully compatible with .NET 8  
**Replacement:** Optional - can use `System.Text.Json` instead

**Action:** Keep if JSON serialization customization is needed, or migrate to `System.Text.Json` for better performance. Current version 13.0.1 works with .NET 8.

### 9. WebGrease (Version 1.5.2)

**Compatibility:** Not compatible with .NET 8  
**Replacement:** WebOptimizer or npm-based bundlers

WebGrease provided CSS/JS minification for System.Web.Optimization.

**Action:** Remove package reference. Use WebOptimizer or configure minification through npm tooling.

### Summary Table

| Package | Current Version | .NET 8 Compatible | Replacement |
|---------|----------------|-------------------|-------------|
| Antlr | 3.5.0.2 | No | Remove |
| Microsoft.AspNet.Mvc | 5.2.7 | No | Built-in ASP.NET Core MVC |
| Microsoft.AspNet.Razor | 3.2.7 | No | Built-in Razor |
| Microsoft.AspNet.Web.Optimization | 1.1.3 | No | WebOptimizer |
| Microsoft.AspNet.WebPages | 3.2.7 | No | Built-in Razor Pages |
| Microsoft.CodeDom.Providers.DotNetCompilerPlatform | 3.6.0 | No | Remove (not needed) |
| Microsoft.Web.Infrastructure | 1.0.0.0 | No | Remove (not needed) |
| Newtonsoft.Json | 13.0.1 | Yes | Keep or use System.Text.Json |
| WebGrease | 1.5.2 | No | WebOptimizer |

---

## Migration Steps in Priority Order

### Phase 1: Project Structure and Configuration (Priority: Critical)

#### Step 1.1: Create New SDK-Style Project File

**Priority:** Critical  
**Complexity:** Medium  
**Estimated Time:** 2-4 hours  
**Dependencies:** None

Convert the old-style `.csproj` to the new SDK-style format.

**Current Project File Structure:**
```xml
<Project ToolsVersion="15.0" DefaultTargets="Build" 
         xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
```

**New Project File Structure:**
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <RootNamespace>asp_net_angularjs</RootNamespace>
  </PropertyGroup>
</Project>
```

**Steps:**
1. Create a backup of the existing `.csproj` file
2. Create a new SDK-style `.csproj` file
3. Remove `packages.config` (NuGet packages will be referenced in the `.csproj`)
4. Add necessary NuGet package references
5. Remove unnecessary assembly references (most are included by default)

#### Step 1.2: Create Program.cs

**Priority:** Critical  
**Complexity:** Medium  
**Estimated Time:** 2-4 hours  
**Dependencies:** Step 1.1

Create the new application entry point to replace `Global.asax.cs`.

**New Program.cs:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Add WebOptimizer for bundling (optional)
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/app.js",
        "WebApp/Components/*.js",
        "WebApp/Directives/*.js");
    
    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/*.css",
        "WebApp/**/*.css");
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseWebOptimizer(); // If using WebOptimizer
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
```

#### Step 1.3: Create appsettings.json

**Priority:** Critical  
**Complexity:** Low  
**Estimated Time:** 1-2 hours  
**Dependencies:** Step 1.1

Migrate configuration from `Web.config` to `appsettings.json`.

**New appsettings.json:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**New appsettings.Development.json:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

#### Step 1.4: Remove Legacy Configuration Files

**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 30 minutes  
**Dependencies:** Steps 1.2, 1.3

Remove files that are no longer needed:
- `Web.config` (main)
- `Web.Debug.config`
- `Web.Release.config`
- `Views/web.config`
- `Global.asax`
- `Global.asax.cs`
- `packages.config`

### Phase 2: Code Migration (Priority: High)

#### Step 2.1: Update Controller Code

**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 1-2 hours  
**Dependencies:** Phase 1

Update the `LandingController.cs` to use ASP.NET Core namespaces.

**Changes Required:**
1. Change `using System.Web.Mvc;` to `using Microsoft.AspNetCore.Mvc;`
2. Change `ActionResult` to `IActionResult`
3. Remove unused `using` statements

#### Step 2.2: Remove App_Start Folder

**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 1 hour  
**Dependencies:** Step 1.2

The `App_Start` folder pattern is not used in ASP.NET Core. Configuration is done in `Program.cs`.

**Files to Remove:**
- `App_Start/RouteConfig.cs` (routing moved to Program.cs)
- `App_Start/BundleConfig.cs` (bundling moved to Program.cs or separate configuration)

#### Step 2.3: Update Views

**Priority:** High  
**Complexity:** Medium  
**Estimated Time:** 2-4 hours  
**Dependencies:** Steps 1.2, 2.2

Update Razor views to work with ASP.NET Core.

**Changes to Index.cshtml:**
1. Remove `@using System.Web.Optimization`
2. Replace `@Styles.Render("~/bundles/styles")` with `<link rel="stylesheet" href="~/bundles/styles.css" />`
3. Replace `@Scripts.Render("~/bundles/scripts")` with `<script src="~/bundles/scripts.js"></script>`

**Create _ViewImports.cshtml:**
```cshtml
@using asp_net_angularjs
@using asp_net_angularjs.Models
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

**Create _ViewStart.cshtml (if using layouts):**
```cshtml
@{
    Layout = "_Layout";
}
```

### Phase 3: Static Files and Bundling (Priority: High)

#### Step 3.1: Configure Static Files Middleware

**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 1-2 hours  
**Dependencies:** Phase 1

ASP.NET Core serves static files from the `wwwroot` folder by default.

**Options:**

Option A - Move static files to wwwroot:
```
wwwroot/
  Content/
    site.css
  WebApp/
    app.js
    Components/
    Directives/
  node_modules/
    jquery/
    angular/
```

Option B - Configure additional static file paths:
```csharp
app.UseStaticFiles(); // Serves from wwwroot

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "node_modules")),
    RequestPath = "/node_modules"
});
```

#### Step 3.2: Set Up Bundling Solution

**Priority:** High  
**Complexity:** Medium  
**Estimated Time:** 4-8 hours  
**Dependencies:** Step 3.1

**Option A - WebOptimizer (Recommended for this migration):**

Install package:
```bash
dotnet add package LigerShark.WebOptimizer.Core
```

Configure in Program.cs:
```csharp
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/app.js",
        "WebApp/Components/**/*.js",
        "WebApp/Directives/**/*.js");
    
    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/**/*.css",
        "WebApp/**/*.css");
});

// In the pipeline
app.UseWebOptimizer();
```

**Option B - Build-time bundling with bundleconfig.json:**

Install package:
```bash
dotnet add package BuildBundlerMinifier
```

Create bundleconfig.json:
```json
[
  {
    "outputFileName": "wwwroot/bundles/scripts.js",
    "inputFiles": [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.min.js",
      "WebApp/app.js",
      "WebApp/Components/**/*.js",
      "WebApp/Directives/**/*.js"
    ],
    "minify": {
      "enabled": true
    }
  },
  {
    "outputFileName": "wwwroot/bundles/styles.css",
    "inputFiles": [
      "Content/**/*.css",
      "WebApp/**/*.css"
    ],
    "minify": {
      "enabled": true
    }
  }
]
```

### Phase 4: Testing and Validation (Priority: High)

#### Step 4.1: Update E2E Tests

**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 2-4 hours  
**Dependencies:** Phases 1-3

The existing Playwright E2E tests should work with minimal changes since they test the frontend behavior. Update the base URL if needed.

**Changes to playwright.config.js:**
```javascript
module.exports = {
  // Update if the port changes
  use: {
    baseURL: 'http://localhost:5000', // Default Kestrel port
  },
};
```

#### Step 4.2: Verify AngularJS Functionality

**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 2-4 hours  
**Dependencies:** Step 4.1

Run the application and verify:
1. AngularJS application bootstraps correctly
2. Components render properly
3. Directives function as expected
4. All static assets load correctly

### Phase 5: Deployment Configuration (Priority: Medium)

#### Step 5.1: Update Launch Settings

**Priority:** Medium  
**Complexity:** Low  
**Estimated Time:** 1 hour  
**Dependencies:** Phase 1

Create `Properties/launchSettings.json`:
```json
{
  "profiles": {
    "asp_net_angularjs": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  },
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:51267",
      "sslPort": 44300
    }
  }
}
```

#### Step 5.2: Configure Production Deployment

**Priority:** Medium  
**Complexity:** Medium  
**Estimated Time:** 4-8 hours  
**Dependencies:** All previous phases

ASP.NET Core applications can be deployed to:
- IIS (with ASP.NET Core Module)
- Kestrel (standalone)
- Docker containers
- Azure App Service
- Linux servers

Create a Dockerfile (optional):
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["angularjs-asp-net48-mvc5.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "asp-net-angularjs.dll"]
```

---

## File-by-File Migration Guide

### 1. angularjs-asp-net48-mvc5.csproj

**Current State:** Old-style MSBuild project file with explicit file includes and NuGet package references via packages.config.

**Migration Steps:**

1. Create new SDK-style project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <RootNamespace>asp_net_angularjs</RootNamespace>
    <AssemblyName>asp-net-angularjs</AssemblyName>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="LigerShark.WebOptimizer.Core" Version="3.0.1" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="WebApp\**\*" CopyToOutputDirectory="PreserveNewest" />
    <Content Include="Content\**\*" CopyToOutputDirectory="PreserveNewest" />
  </ItemGroup>

</Project>
```

2. Delete `packages.config`
3. Remove all explicit `<Reference>` elements (framework references are implicit)
4. Remove all `<Compile Include>` elements (SDK-style projects include all .cs files by default)
5. Remove `<Import>` elements for Microsoft.Common.props and targets

### 2. packages.config

**Current State:** XML file listing NuGet packages.

**Migration:** Delete this file. Package references are now in the `.csproj` file.

### 3. Web.config

**Current State:** Main configuration file with appSettings, compilation settings, assembly bindings, and CodeDom configuration.

**Migration Steps:**

1. Create `appsettings.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

2. Create `appsettings.Development.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

3. Delete `Web.config` (not needed in ASP.NET Core unless hosting in IIS)

**Note:** If deploying to IIS, a minimal `web.config` will be auto-generated during publish, or you can create one for specific IIS configuration.

### 4. Web.Debug.config and Web.Release.config

**Current State:** XDT transformation files for environment-specific configuration.

**Migration:** Delete these files. Use environment-specific `appsettings.{Environment}.json` files instead.

### 5. Views/web.config

**Current State:** Razor configuration file specifying namespaces and view settings.

**Migration Steps:**

1. Create `Views/_ViewImports.cshtml`:
```cshtml
@using asp_net_angularjs
@using asp_net_angularjs.Models
@using asp_net_angularjs.Controllers
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

2. Delete `Views/web.config`

### 6. Global.asax and Global.asax.cs

**Current State:** Application entry point using HttpApplication lifecycle.

**Migration Steps:**

1. Create `Program.cs`:
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

// Configure WebOptimizer for bundling
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/app.js",
        "WebApp/Components/**/*.js",
        "WebApp/Directives/**/*.js");
    
    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/**/*.css",
        "WebApp/**/*.css");
});

var app = builder.Build();

// Configure middleware pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseWebOptimizer();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// Configure routes (replaces RouteConfig.cs)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
```

2. Delete `Global.asax` and `Global.asax.cs`

### 7. App_Start/RouteConfig.cs

**Current State:** Route configuration using RouteCollection.

**Migration:** Delete this file. Routing is configured in `Program.cs`:

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");
```

### 8. App_Start/BundleConfig.cs

**Current State:** Bundle configuration using System.Web.Optimization.

**Migration:** Delete this file. Bundling is configured in `Program.cs` using WebOptimizer or moved to a build-time process.

### 9. Controllers/LandingController.cs

**Current State:**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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

**Migrated Version:**
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

**Changes:**
- Replace `using System.Web.Mvc;` with `using Microsoft.AspNetCore.Mvc;`
- Remove unused `using` statements
- Change `ActionResult` to `IActionResult`

### 10. Views/Landing/Index.cshtml

**Current State:**
```cshtml
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

**Migrated Version:**
```cshtml
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>XLTS for AngularJS with .NET 8</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="~/bundles/styles.css" />
</head>
<body ng-app="app">
    <h1 data-testid="title">XLTS for AngularJS with .NET 8</h1>
    <test-directive></test-directive>
    <test-component></test-component>
    <script src="~/bundles/scripts.js"></script>
</body>
</html>
```

**Changes:**
- Remove `@using System.Web.Optimization`
- Replace `@Styles.Render("~/bundles/styles")` with `<link rel="stylesheet" href="~/bundles/styles.css" />`
- Replace `@Scripts.Render("~/bundles/scripts")` with `<script src="~/bundles/scripts.js"></script>`
- Move script tag to end of body (best practice)
- Remove IE-specific meta tag (no longer needed)
- Update title to reflect .NET 8

### 11. WebApp/app.js, Components, and Directives

**Current State:** AngularJS application files.

**Migration:** No changes required. These files are pure JavaScript/AngularJS and are not affected by the .NET migration. They will continue to work as-is once properly served as static files.

**Note:** Ensure the files are accessible via the static files middleware. If using WebOptimizer, they will be bundled. If not, ensure they are in `wwwroot` or configured as additional static file paths.

---

## Testing Strategy

### Unit Testing

If unit tests exist for the .NET code, they will need to be updated:
1. Update test project to target .NET 8
2. Replace `System.Web.Mvc` references with `Microsoft.AspNetCore.Mvc`
3. Use `Microsoft.AspNetCore.Mvc.Testing` for integration tests

### Integration Testing

Create integration tests using the WebApplicationFactory pattern:

```csharp
public class LandingControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public LandingControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Index_ReturnsSuccessStatusCode()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/");
        response.EnsureSuccessStatusCode();
    }
}
```

### E2E Testing

The existing Playwright tests should continue to work. Update the base URL in `playwright.config.js` if the port changes:

```javascript
module.exports = {
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
  },
};
```

### Manual Testing Checklist

1. Application starts without errors
2. Landing page loads correctly
3. AngularJS bootstraps and displays version
4. jQuery version displays in directive
5. CSS styles are applied correctly
6. All static assets load (check browser network tab)
7. No JavaScript console errors

---

## Rollback Plan

### Before Migration

1. Create a complete backup of the repository
2. Tag the current state: `git tag pre-net8-migration`
3. Create a migration branch: `git checkout -b feature/net8-migration`

### During Migration

1. Commit frequently with descriptive messages
2. Keep the original files until migration is verified
3. Document any issues encountered

### If Rollback is Needed

1. Checkout the pre-migration tag: `git checkout pre-net8-migration`
2. Or revert the migration branch: `git revert --no-commit HEAD~n..HEAD`
3. Restore any configuration or deployment settings

### Post-Migration Verification

Before removing the migration branch protection:
1. All tests pass
2. Application runs correctly in development
3. Application deploys successfully to staging
4. Manual testing completed
5. Performance benchmarks acceptable

---

## Additional Resources

### Official Documentation

- [Migrate from ASP.NET MVC to ASP.NET Core MVC](https://docs.microsoft.com/en-us/aspnet/core/migration/mvc)
- [Migrate from ASP.NET to ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/migration/proper-to-2x/)
- [.NET Upgrade Assistant](https://docs.microsoft.com/en-us/dotnet/core/porting/upgrade-assistant-overview)
- [ASP.NET Core fundamentals](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/)

### Tools

- [.NET Upgrade Assistant](https://github.com/dotnet/upgrade-assistant) - Automated migration tool
- [try-convert](https://github.com/dotnet/try-convert) - Project file converter
- [API Analyzer](https://docs.microsoft.com/en-us/dotnet/standard/analyzers/api-analyzer) - Identifies compatibility issues

### Community Resources

- [ASP.NET Core Migration Guide (GitHub)](https://github.com/aspnet/AspNetCore/wiki/Migrating-from-ASP.NET-MVC-5-to-ASP.NET-Core-MVC)
- [WebOptimizer Documentation](https://github.com/ligershark/WebOptimizer)

---

## Appendix: Complete New Project Structure

After migration, the project structure should look like:

```
angularjs-asp-net48-mvc5/
├── angularjs-asp-net48-mvc5.csproj    # New SDK-style project file
├── Program.cs                          # Application entry point
├── appsettings.json                    # Main configuration
├── appsettings.Development.json        # Development configuration
├── Properties/
│   └── launchSettings.json            # Launch profiles
├── Controllers/
│   └── LandingController.cs           # Updated controller
├── Views/
│   ├── _ViewImports.cshtml            # View imports
│   └── Landing/
│       └── Index.cshtml               # Updated view
├── wwwroot/                           # Static files (optional structure)
│   ├── Content/
│   │   └── site.css
│   └── WebApp/
│       ├── app.js
│       ├── Components/
│       └── Directives/
├── node_modules/                      # npm packages
├── package.json                       # npm configuration
├── e2e/                              # E2E tests
│   ├── tests/
│   └── pages/
└── playwright.config.js              # Playwright configuration
```

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*Target Framework: .NET 8*  
*Source Framework: .NET Framework 4.8*
