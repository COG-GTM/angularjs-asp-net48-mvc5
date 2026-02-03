using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure middleware pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

// Serve static files from multiple directories
var contentRoot = builder.Environment.ContentRootPath;

// Serve node_modules
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(contentRoot, "node_modules")),
    RequestPath = "/node_modules"
});

// Serve WebApp directory
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(contentRoot, "WebApp")),
    RequestPath = "/WebApp"
});

// Serve Content directory
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(contentRoot, "Content")),
    RequestPath = "/Content"
});

app.UseRouting();
app.UseAuthorization();

// Configure routes (replaces RouteConfig.cs)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
