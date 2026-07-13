using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// MVC controllers + Razor views (replaces System.Web.Mvc registration
// previously wired up in Global.asax's Application_Start).
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseRouting();

// Serve the Angular CLI build output (Content/app/browser/*) and any other
// files under the physical "Content" directory at the "/Content" request path.
// This replaces the old System.Web.Optimization bundling: the front-end is now
// built by `npm run build` and referenced directly from the landing view.
var contentPath = Path.Combine(app.Environment.ContentRootPath, "Content");
if (Directory.Exists(contentPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(contentPath),
        RequestPath = "/Content"
    });
}

// Root URL ("") serves Landing/Index, matching the old RouteConfig empty route.
app.MapControllerRoute(
    name: "Landing",
    pattern: "",
    defaults: new { controller = "Landing", action = "Index" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
