namespace ModernApp.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Items.Any()) return;
        db.Items.AddRange(
            new Item { Name = "First Item", Description = "This is the first seeded item" },
            new Item { Name = "Second Item", Description = "This is the second seeded item" },
            new Item { Name = "Third Item", Description = "This is the third seeded item" }
        );
        db.SaveChanges();
    }
}
