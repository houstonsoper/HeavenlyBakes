using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class BakeEntityTypeConfiguration : IEntityTypeConfiguration<Bake>
{
    public void Configure(EntityTypeBuilder<Bake> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Price).HasPrecision(5,2).IsRequired();
        builder.Property(b => b.Rating).HasPrecision(3,2).IsRequired();
    }
}