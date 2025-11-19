# Frontend Build Documentation

## Overview

This document describes the frontend build process for the AngularJS application. The project has been migrated from using ASP.NET's `Microsoft.AspNet.Web.Optimization` bundling system to a modern npm-based bundler (Webpack).

## Prerequisites

- Node.js >= 18
- npm >= 9

## Build System

The project uses **Webpack 5** to bundle JavaScript and CSS assets. The bundler configuration is defined in `webpack.config.js`.

## Available Scripts

### Production Build
```bash
npm run build
```
Builds the frontend assets in production mode with minification enabled. Output files are generated in `wwwroot/bundles/`.

### Development Build
```bash
npm run build:dev
```
Builds the frontend assets in development mode with source maps enabled for debugging.

### Watch Mode
```bash
npm run watch
```
Runs the bundler in watch mode, automatically rebuilding when source files change. Useful during development.

## Bundle Configuration

### JavaScript Bundle (`scripts.bundle.js`)
The JavaScript bundle includes the following files in order:
1. jQuery (from `node_modules/jquery/dist/jquery.min.js`)
2. AngularJS (from `node_modules/angular/angular.min.js`)
3. AngularJS application module (`WebApp/app.js`)
4. AngularJS components (`WebApp/Components/*.js`)
5. AngularJS directives (`WebApp/Directives/*.js`)

### CSS Bundle (`styles.bundle.css`)
The CSS bundle includes the following files:
1. Site styles (`Content/site.css`)
2. Component styles (`WebApp/Components/*.css`)
3. Directive styles (`WebApp/Directives/*.css`)

## Output Location

All bundled assets are output to the `wwwroot/bundles/` directory:
- `scripts.bundle.js` - JavaScript bundle
- `styles.bundle.css` - CSS bundle
- `scripts.bundle.js.LICENSE.txt` - License information for bundled libraries

## Migration from ASP.NET Bundling

### Previous System
The application previously used `Microsoft.AspNet.Web.Optimization` with configuration in `App_Start/BundleConfig.cs`. This system was tightly coupled to ASP.NET Framework and is not available in ASP.NET Core.

### New System
The new Webpack-based bundling system:
- Is framework-agnostic and works with ASP.NET Core
- Provides better performance and modern tooling
- Supports source maps for debugging
- Offers watch mode for development
- Can be extended with additional loaders and plugins as needed

### Removed Dependencies
The following NuGet packages have been removed as they are no longer needed:
- `Microsoft.AspNet.Web.Optimization` (1.1.3)
- `WebGrease` (1.5.2)

## Integration with ASP.NET Core

When migrating to ASP.NET Core, the bundled assets in `wwwroot/bundles/` can be served as static files. Update your Razor views to reference the bundled files:

```html
<!-- Replace ASP.NET Framework bundling syntax -->
@Styles.Render("~/bundles/styles")
@Scripts.Render("~/bundles/scripts")

<!-- With direct references to bundled files -->
<link rel="stylesheet" href="~/bundles/styles.bundle.css" />
<script src="~/bundles/scripts.bundle.js"></script>
```

## Adding New Files

When adding new JavaScript or CSS files to the project:

1. Add the file to the appropriate directory (`WebApp/`, `WebApp/Components/`, or `WebApp/Directives/`)
2. Update `webpack.config.js` to include the new file in the appropriate entry point
3. Run `npm run build` to regenerate the bundles

## Troubleshooting

### Build Warnings
Webpack may show warnings about bundle size. These are informational and can be addressed later through code splitting if needed.

### Source Maps
Source maps are generated in development mode (`npm run build:dev`) to help with debugging. They are disabled in production builds for performance.

### Clean Build
The output directory (`wwwroot/bundles/`) is automatically cleaned before each build to ensure no stale files remain.
