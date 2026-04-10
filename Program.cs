using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Landing/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

// Serve Angular CLI build output from Content/app/browser/ at ~/Content/app/browser/
var contentPath = Path.Combine(builder.Environment.ContentRootPath, "Content");
Directory.CreateDirectory(contentPath);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(contentPath),
    RequestPath = "/Content"
});

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
