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
        
        builder.ToTable(tableBuilder =>
        {
            tableBuilder.HasCheckConstraint(
                "CK_Bakes_Discount_Range",
                "[Discount] >= 0 AND [Discount] <= 100"
            );
        });
        
        builder.HasOne(b => b.BakeType)
            .WithMany()
            .HasForeignKey(b => b.BakeTypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}