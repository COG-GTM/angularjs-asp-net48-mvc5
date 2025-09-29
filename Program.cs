using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularJS", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowAngularJS");

app.UseStaticFiles(); // Serves from wwwroot by default

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "WebApp")),
    RequestPath = "/WebApp"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Content")),
    RequestPath = "/Content"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "node_modules")),
    RequestPath = "/node_modules"
});

app.UseRouting();

app.MapControllers();

app.MapGet("/", async (IWebHostEnvironment env) => 
{
    var filePath = Path.Combine(env.ContentRootPath, "wwwroot", "index.html");
    var content = await File.ReadAllTextAsync(filePath);
    return Results.Content(content, "text/html");
});

app.Run();
