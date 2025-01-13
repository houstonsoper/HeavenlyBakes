using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class ReviewEntityTypeConfiguration : IEntityTypeConfiguration<Review>

{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        builder.HasOne(r => r.Bake)
            .WithMany()
            .HasForeignKey(r => r.BakeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}