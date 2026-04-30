using Microsoft.EntityFrameworkCore;
using ModernApp.Data;

namespace ModernApp.Endpoints;

public static class ItemEndpoints
{
    public static void MapItemEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/items");

        group.MapGet("/", async (AppDbContext db) =>
            await db.Items.OrderByDescending(i => i.CreatedAt).ToListAsync());

        group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Items.FindAsync(id) is Item item
                ? Results.Ok(item)
                : Results.NotFound());

        group.MapPost("/", async (CreateItemRequest request, AppDbContext db) =>
        {
            var item = new Item { Name = request.Name, Description = request.Description };
            db.Items.Add(item);
            await db.SaveChangesAsync();
            return Results.Created($"/api/items/{item.Id}", item);
        });

        group.MapPut("/{id:int}", async (int id, UpdateItemRequest request, AppDbContext db) =>
        {
            var item = await db.Items.FindAsync(id);
            if (item is null) return Results.NotFound();
            item.Name = request.Name;
            item.Description = request.Description;
            item.UpdatedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
            return Results.Ok(item);
        });

        group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
        {
            var item = await db.Items.FindAsync(id);
            if (item is null) return Results.NotFound();
            db.Items.Remove(item);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}

public record CreateItemRequest(string Name, string? Description);
public record UpdateItemRequest(string Name, string? Description);
