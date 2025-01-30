using heavenlybakes.api.Configurations;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Contexts;

public class HeavenlyBakesDbContext : DbContext
{
    public DbSet<Bake> Bakes { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<PaymentMethod> PaymentMethods { get; set; }
    public DbSet<BakeType> BakeTypes { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserGroup> UserGroups { get; set; }
    public DbSet<OrderStatus> OrderStatus { get; set; }
    
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new BakeEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new OrderEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new OrderItemEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new PaymentMethodEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ReviewEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserGroupEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new PasswordResetTokenEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new OrderStatusEntityTypeConfiguration());
    }

    public HeavenlyBakesDbContext(DbContextOptions options) : base(options)
    {
    }
}
