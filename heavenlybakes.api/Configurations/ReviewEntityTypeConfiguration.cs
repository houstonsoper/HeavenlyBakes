using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class ReviewEntityTypeConfiguration : IEntityTypeConfiguration<Review>

{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        //Foreign key relationship for Bake
        builder.HasOne(r => r.Bake)
            .WithMany()
            .HasForeignKey(r => r.BakeId)
            .OnDelete(DeleteBehavior.Restrict);
        
        //Composite key
        builder.HasKey(r => new {r.CustomerId, r.BakeId });
        
    }
}