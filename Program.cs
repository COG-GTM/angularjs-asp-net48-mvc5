var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

// Configure WebOptimizer for bundling
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("/bundles/scripts.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "WebApp/app.js",
        "WebApp/Components/**/*.js",
        "WebApp/Directives/**/*.js");

    pipeline.AddCssBundle("/bundles/styles.css",
        "Content/**/*.css",
        "WebApp/**/*.css");
});

var app = builder.Build();

// Configure middleware pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseWebOptimizer();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// Configure routes (replaces RouteConfig.cs)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Landing}/{action=Index}/{id?}");

app.Run();
