using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/app.js",
        "WebApp/Components/*.js",
        "WebApp/Directives/*.js");

    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/*.css",
        "WebApp/**/*.css");
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, "node_modules")),
        RequestPath = "/node_modules"
    });
}

app.UseWebOptimizer();

app.UseRouting();

app.MapControllerRoute(
    name: "Landing",
    pattern: "",
    defaults: new { controller = "Landing", action = "Index" });

app.Run();
