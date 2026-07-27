using Microsoft.Extensions.FileProviders;

const string CorsPolicyName = "AllowAngularJS";

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddControllers();
if (allowedOrigins.Length > 0)
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(CorsPolicyName, policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });
}

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// The AngularJS and jQuery assets are installed with npm at the repository root, outside of wwwroot.
// Only the packages the SPA loads are mounted, so the rest of node_modules stays unreachable.
var nodeModulesPath = Path.GetFullPath(Path.Combine(app.Environment.ContentRootPath, "..", "node_modules"));
foreach (var package in new[] { "angular", "jquery/dist" })
{
    var packagePath = Path.Combine(nodeModulesPath, package);
    if (!Directory.Exists(packagePath))
    {
        continue;
    }

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(packagePath),
        RequestPath = $"/node_modules/{package}"
    });
}

app.UseRouting();
if (allowedOrigins.Length > 0)
{
    app.UseCors(CorsPolicyName);
}
app.MapControllers();

app.Run();
