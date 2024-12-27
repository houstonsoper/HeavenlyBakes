using heavenlybakes.api.Configurations;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Context;

public class HeavenlyBakesDbContext : DbContext
{
    public DbSet<Bake> Bakes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new BakeEntityTypeConfiguration());
    }

    public HeavenlyBakesDbContext(DbContextOptions options) : base(options)
    {
    }
}
