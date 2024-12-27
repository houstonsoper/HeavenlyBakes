using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class BakeEntityTypeConfiguration : IEntityTypeConfiguration<Bake>
{
    public void Configure(EntityTypeBuilder<Bake> builder)
    {
        builder.Property(b => b.Name).HasMaxLength(50).IsRequired();
        builder.Property(b => b.Price).HasPrecision(5,2).IsRequired();
        builder.Property(b => b.Type).HasMaxLength(20).IsRequired();
        builder.Property(b => b.ImageUrl).HasMaxLength(500).IsRequired();
        builder.Property(b => b.Description).HasMaxLength(200).IsRequired();
        builder.Property(b => b.Rating).HasPrecision(3,2).IsRequired();
    }
}