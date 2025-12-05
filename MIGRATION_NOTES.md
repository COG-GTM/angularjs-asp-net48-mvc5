# .NET Framework 4.8 to .NET 8 Migration Notes

## Phase 1 & 2 (Tasks 1-3) - Project Structure Migration

### Completed Tasks

#### Task 1: Assessment and Prerequisites Setup
- Installed .NET 8 SDK (version 8.0.416)
- Created complete backup of the project at `/home/ubuntu/backups/`
- Installed try-convert tool (version 0.9.232202)

#### Task 2: Create New .NET 8 Project
- Created reference .NET 8 webapp project (`angularjs-asp-net8`) to understand SDK-style project format

#### Task 3: Migrate Project Structure
- Converted `angularjs-asp-net48-mvc5.csproj` from old-style to SDK-style format
- Updated target framework from `net4.8` to `net8.0`
- Migrated from `packages.config` to PackageReference format
- Removed `packages.config` file

### Changes Made to Project File

The project file was converted from the verbose old-style format (178 lines) to the modern SDK-style format (39 lines):

**Before:**
- Old MSBuild format with explicit file references
- Target Framework: .NET Framework 4.8
- Package management via packages.config

**After:**
- SDK-style format using `Microsoft.NET.Sdk.Web`
- Target Framework: .NET 8.0
- Package management via PackageReference
- Implicit file inclusion (no need to list individual files)

### Package Migration

| Original Package | Version | Migration Status |
|-----------------|---------|------------------|
| Newtonsoft.Json | 13.0.1 | Updated to 13.0.3 (compatible with .NET 8) |
| Microsoft.AspNet.Mvc | 5.2.7 | Removed - replaced by ASP.NET Core MVC (built into SDK) |
| Microsoft.AspNet.Razor | 3.2.7 | Removed - replaced by ASP.NET Core Razor (built into SDK) |
| Microsoft.AspNet.WebPages | 3.2.7 | Removed - replaced by ASP.NET Core (built into SDK) |
| Microsoft.AspNet.Web.Optimization | 1.1.3 | Removed - needs alternative bundling solution |
| Microsoft.CodeDom.Providers.DotNetCompilerPlatform | 3.6.0 | Removed - not needed in .NET 8 |
| Microsoft.Web.Infrastructure | 1.0.0.0 | Removed - not needed in .NET 8 |
| Antlr | 3.5.0.2 | Removed - not needed for this project |
| WebGrease | 1.5.2 | Removed - needs alternative minification solution |

### Known Issues (Expected - To Be Resolved in Later Phases)

The following build errors are expected at this stage and will be resolved in subsequent migration phases:

1. **Namespace Changes Required**: The C# code still uses `System.Web.Mvc` and `System.Web.Routing` namespaces which don't exist in .NET 8. These need to be updated to `Microsoft.AspNetCore.Mvc` and `Microsoft.AspNetCore.Routing`.

2. **Bundling/Optimization**: The `System.Web.Optimization` namespace is not available in .NET 8. An alternative bundling solution (like WebOptimizer or manual bundling) will be needed.

3. **Global.asax**: The `System.Web.HttpApplication` class doesn't exist in .NET 8. The application startup will need to be migrated to `Program.cs` with the new minimal hosting model.

4. **Razor Views**: Views using `@using System.Web.Optimization` will need to be updated to use the new bundling approach.

### Next Steps (Future Phases)

1. **Phase 3**: Migrate C# code to use ASP.NET Core namespaces
2. **Phase 4**: Replace Global.asax with Program.cs and configure middleware
3. **Phase 5**: Update Razor views and move WebApp/ to wwwroot/
4. **Phase 6**: Replace Web.config with appsettings.json
5. **Phase 7**: Implement alternative bundling/minification solution
