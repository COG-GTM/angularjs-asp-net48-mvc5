using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var fileProvider = new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory()));

var defaultFilesOptions = new DefaultFilesOptions
{
    FileProvider = fileProvider,
    RequestPath = ""
};
defaultFilesOptions.DefaultFileNames.Clear();
defaultFilesOptions.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(defaultFilesOptions);

var staticFileOptions = new StaticFileOptions
{
    FileProvider = fileProvider,
    RequestPath = ""
};
app.UseStaticFiles(staticFileOptions);

app.UseRouting();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
