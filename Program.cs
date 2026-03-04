var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(
    name: "Landing",
    pattern: "",
    defaults: new { controller = "Landing", action = "Index" });
// Fallback so that deep-linked Angular routes still load the SPA shell
app.MapFallbackToController("Index", "Landing");
app.Run();
