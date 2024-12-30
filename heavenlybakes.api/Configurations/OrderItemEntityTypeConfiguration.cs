using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class OrderItemEntityTypeConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        //Primary Key
        builder.HasKey(oi => oi.Id);

        //Foreign Key - OrderId
        builder
            .HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);
        
        //Foreign Key - BakeId
        builder
            .HasOne(oi=> oi.Bake)
            .WithMany()
            .HasForeignKey(oi => oi.BakeId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Property(oi => oi.Price).HasPrecision(5,2);
    }
}