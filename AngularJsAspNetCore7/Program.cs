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
var nodeModulesPath = Path.GetFullPath(Path.Combine(app.Environment.ContentRootPath, "..", "node_modules"));
if (Directory.Exists(nodeModulesPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(nodeModulesPath),
        RequestPath = "/node_modules"
    });
}

app.UseRouting();
if (allowedOrigins.Length > 0)
{
    app.UseCors(CorsPolicyName);
}
app.MapControllers();

app.Run();
