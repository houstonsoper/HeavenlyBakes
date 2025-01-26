using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        //Primary Key
        builder.HasKey(o => o.OrderId);
        
        builder.Property(o => o.Total).HasPrecision(5, 2);
        
        //Foreign key for Payment metyhod
        builder.HasOne(o => o.PaymentMethod)
            .WithMany()
            .HasForeignKey(o => o.PaymentMethodId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(o => o.PaymentMethodId).HasDefaultValue(1);
        
        //Foreign key for User
        builder.HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);

    }
}