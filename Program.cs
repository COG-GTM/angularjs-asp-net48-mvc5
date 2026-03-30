using Microsoft.Extensions.FileProviders;

namespace asp_net_angularjs;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllersWithViews();

        var app = builder.Build();

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        // Serve only the Content/ directory as static files.
        // The Angular build output lives in Content/app/ and site.css is in Content/.
        var contentPath = Path.Combine(app.Environment.ContentRootPath, "Content");
        if (Directory.Exists(contentPath))
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(contentPath),
                RequestPath = "/Content"
            });
        }

        app.UseRouting();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Landing}/{action=Index}/{id?}");

        app.Run();
    }
}
