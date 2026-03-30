namespace asp_net_angularjs;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Serve static files from the project root (Content/ directory lives here,
        // not in the default wwwroot/ folder).
        builder.Environment.WebRootPath = builder.Environment.ContentRootPath;

        builder.Services.AddControllersWithViews();

        var app = builder.Build();

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        app.UseStaticFiles();
        app.UseRouting();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Landing}/{action=Index}/{id?}");

        app.Run();
    }
}
