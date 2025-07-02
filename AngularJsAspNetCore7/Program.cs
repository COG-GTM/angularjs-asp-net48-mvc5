var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularJS", policy =>
    {
        policy.WithOrigins("http://localhost:51267")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowAngularJS");
app.UseRouting();
app.MapControllers();

app.Run("http://localhost:51267");
