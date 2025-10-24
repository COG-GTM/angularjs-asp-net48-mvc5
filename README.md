# AngularJS with ASP.NET MVC 5 on .NET Framework 4.8

A reference implementation demonstrating the integration of AngularJS with ASP.NET MVC 5 on .NET Framework 4.8. This project serves as a practical example for organizations maintaining legacy AngularJS applications while leveraging modern development practices and extended long-term support.

## Overview

This hybrid web application combines server-side rendering with ASP.NET MVC 5 and client-side interactivity through AngularJS. It demonstrates best practices for maintaining and modernizing legacy AngularJS applications with extended support options.

**Key Highlights:**
- Production-ready integration of AngularJS with ASP.NET MVC 5
- Extended AngularJS support through XLTS.dev or standard LTS packages
- Modern development tooling (npm, Playwright, Prettier)
- Comprehensive end-to-end testing infrastructure
- Asset bundling and optimization for production deployments

## Features

### Frontend Stack
- **AngularJS 1.8.3** - Client-side framework with XLTS extended support option
- **jQuery 3.6.3** - DOM manipulation and utilities
- **Custom Components & Directives** - Reusable UI components demonstrating AngularJS patterns

### Backend Stack
- **.NET Framework 4.8** - Robust server-side runtime
- **ASP.NET MVC 5** - Model-View-Controller architecture
- **Asset Bundling** - Using [Microsoft.AspNet.Web.Optimization](https://docs.microsoft.com/en-us/aspnet/mvc/overview/performance/bundling-and-minification) for JavaScript/CSS optimization

### Development Tools
- **Playwright** - Modern end-to-end testing framework
- **Prettier** - Code formatting for consistent style
- **npm Scripts** - Automated development workflows
- **Node.js 18+** - Modern JavaScript runtime for tooling

## Prerequisites

### Required Software
- **Windows 10/11** - Older versions may work but are untested
- **[Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)** - Community Edition or higher
  - Older versions may work but are untested
- **[.NET Framework 4.8](https://dotnet.microsoft.com/en-us/download/dotnet-framework)** - Can be installed via Visual Studio installer
- **[Node.js 18+](https://nodejs.org/)** - For npm package management and tooling
- **npm 9+** - Included with Node.js

### Optional Tools
- **[nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)** - For managing Node.js versions (`.nvmrc` file included)

## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xlts-dev/angularjs-asp-net48-mvc5.git
   cd angularjs-asp-net48-mvc5
   ```

2. **Install npm dependencies:**

   **Option A: Using XLTS.dev packages (recommended for extended support)**
   
   Configure authentication with the XLTS.dev registry by adding your token to the `.npmrc` file in your user home directory:
   ```
   @xlts.dev:registry=https://registry.xlts.dev/
   //registry.xlts.dev/:_authToken=YOUR_TOKEN_HERE
   ```
   
   Then install packages:
   ```bash
   npm install
   ```
   
   > **Note:** If you don't have an XLTS.dev token, see Option B below.

   **Option B: Using standard LTS packages**
   
   If you don't have access to XLTS.dev, use the standard AngularJS LTS packages:
   ```bash
   npm run switch-to-lts-packages
   ```

3. **Open the project in Visual Studio:**
   - Double-click `angularjs-asp-net48-mvc5.sln` or open it from Visual Studio

4. **Run the application:**
   - Press `F5` or click the green start button in the Visual Studio toolbar
   - Your default browser will launch and display the application at `http://localhost:51267/`

### Project Structure

```
angularjs-asp-net48-mvc5/
├── WebApp/                      # AngularJS application files
│   ├── app.js                  # Main AngularJS module definition
│   ├── Components/             # Reusable AngularJS components
│   │   └── test.component.js  # Example component
│   └── Directives/             # Custom AngularJS directives
│       └── test.directive.js  # Example directive
├── Controllers/                # ASP.NET MVC controllers
│   └── LandingController.cs   # Main application controller
├── Views/                      # Razor views
│   └── Landing/
│       └── Index.cshtml       # Main application entry point
├── App_Start/                  # ASP.NET configuration
│   ├── BundleConfig.cs        # Asset bundling configuration
│   └── RouteConfig.cs         # MVC routing configuration
├── Content/                    # CSS and static assets
├── e2e/                        # End-to-end tests
│   ├── tests/                 # Test specifications
│   │   └── app.e2e.js        # Main test suite
│   └── pages/                 # Page object models
├── packages/                   # NuGet packages
├── node_modules/              # npm packages
├── package.json               # npm configuration
├── packages.config            # NuGet configuration
├── playwright.config.js       # Playwright test configuration
├── .nvmrc                     # Node.js version specification
└── angularjs-asp-net48-mvc5.sln  # Visual Studio solution file
```

## Development

### Available npm Scripts

```bash
# Run end-to-end tests
npm run e2e

# Run E2E tests in debug mode (headed browser)
npm run e2e:debug

# Format code with Prettier
npm run prettier

# Update npm dependencies
npm run update

# Switch to LTS AngularJS packages
npm run switch-to-lts-packages
```

### Running Tests

The project includes comprehensive end-to-end tests using Playwright:

1. **Ensure the application is running** (press `F5` in Visual Studio)
2. **Run tests:**
   ```bash
   npm run e2e
   ```
3. **View test results:**
   - HTML report is generated in `playwright-report/`
   - Open `playwright-report/index.html` in a browser to view detailed results

### Code Formatting

This project uses Prettier for consistent code formatting:

```bash
npm run prettier
```

This formats all JavaScript, JSON, CSS, HTML, and Markdown files according to the project's style guidelines.

## Architecture

### Backend Architecture

The ASP.NET MVC 5 backend follows a traditional Model-View-Controller pattern:

- **Controllers** (`Controllers/LandingController.cs`) - Handle HTTP requests and return views
- **Views** (`Views/Landing/Index.cshtml`) - Razor templates that render HTML and bootstrap AngularJS
- **Bundling** (`App_Start/BundleConfig.cs`) - Configures JavaScript/CSS bundling for optimization
- **Routing** (`App_Start/RouteConfig.cs`) - Defines URL routing rules

### Frontend Architecture

The AngularJS frontend is organized into modular components:

- **Main Module** (`WebApp/app.js`) - Defines the `asp_net_angularjs` module
- **Components** (`WebApp/Components/`) - Self-contained UI components with templates and controllers
- **Directives** (`WebApp/Directives/`) - Custom HTML elements and attributes
- **Asset Loading** - Scripts and styles are bundled via ASP.NET optimization

### Integration Points

1. **Initial Page Load** - ASP.NET MVC renders `Index.cshtml` with bundled assets
2. **AngularJS Bootstrap** - The `ng-app="app"` directive initializes the AngularJS application
3. **Asset Bundling** - `BundleConfig` combines and minifies JavaScript/CSS for production
4. **Client-Side Routing** - AngularJS handles navigation after initial page load

## XLTS vs LTS Packages

### XLTS.dev (Extended Long Term Support)

XLTS.dev provides extended support for AngularJS beyond its official end-of-life:

- **Security patches** for newly discovered vulnerabilities
- **Bug fixes** for critical issues
- **Compatibility updates** for modern browsers
- **Professional support** options available

**When to use:** Production applications requiring ongoing security and compatibility updates.

### Standard LTS Packages

The standard AngularJS 1.8.3 LTS release is the final official version:

- **No further updates** after the official EOL
- **Community support** only
- **Free and open source**

**When to use:** Development, testing, or applications with planned migration timelines.

## Browser Support

This application supports modern browsers:

- **Chrome** (latest)
- **Firefox** (latest)
- **Edge** (latest)
- **Safari** (latest)

Internet Explorer is not supported as AngularJS 1.8.x dropped IE support.

## Troubleshooting

### npm install fails with authentication error

**Problem:** Cannot authenticate with XLTS.dev registry

**Solution:** Either configure your `.npmrc` with a valid XLTS.dev token or switch to LTS packages:
```bash
npm run switch-to-lts-packages
```

### Application doesn't start in Visual Studio

**Problem:** Build errors or missing dependencies

**Solution:**
1. Ensure .NET Framework 4.8 is installed
2. Restore NuGet packages: Right-click solution → "Restore NuGet Packages"
3. Clean and rebuild: Build → Clean Solution, then Build → Rebuild Solution

### E2E tests fail

**Problem:** Tests cannot connect to the application

**Solution:**
1. Ensure the application is running on `http://localhost:51267/`
2. Check that Playwright browsers are installed: `npx playwright install`
3. Verify no firewall is blocking localhost connections

### Asset bundling issues

**Problem:** JavaScript or CSS not loading correctly

**Solution:**
1. Check `App_Start/BundleConfig.cs` for correct bundle paths
2. Verify files exist in `WebApp/` and `Content/` directories
3. Clear browser cache and restart the application

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Format code with Prettier (`npm run prettier`)
4. Run tests to ensure nothing breaks (`npm run e2e`)
5. Commit your changes with clear messages
6. Push to your fork and submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

### Documentation
- [AngularJS Documentation](https://docs.angularjs.org/)
- [XLTS.dev AngularJS Support](https://xlts.dev/angularjs)
- [ASP.NET MVC 5 Documentation](https://docs.microsoft.com/en-us/aspnet/mvc/mvc5)
- [.NET Framework 4.8 Documentation](https://docs.microsoft.com/en-us/dotnet/framework/)
- [Playwright Documentation](https://playwright.dev/)

### Related Projects
- [AngularJS Migration Guide](https://angular.io/guide/upgrade)
- [ASP.NET Core Migration](https://docs.microsoft.com/en-us/aspnet/core/migration/)

## Support

For issues, questions, or contributions:
- **GitHub Issues:** [Report a bug or request a feature](https://github.com/xlts-dev/angularjs-asp-net48-mvc5/issues)
- **XLTS.dev Support:** [support@xlts.dev](mailto:support@xlts.dev)

## Acknowledgments

This project is maintained by [XLTS.dev](https://xlts.dev/) to support organizations maintaining legacy AngularJS applications.

**Contributors:**
- Jaroslaw Zolnowski (jarek@xlts.dev)
- Ed Clement (ed@xlts.dev)
