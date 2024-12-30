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

        builder.Property(o => o.CustomerId).HasMaxLength(100).IsRequired();
        builder.Property(o => o.ShippingAddress).HasMaxLength(200).IsRequired();
        builder.Property(o => o.ShippingCity).HasMaxLength(100).IsRequired();
        builder.Property(o => o.ShippingPostalCode).HasMaxLength(20).IsRequired();
        builder.Property(o => o.ShippingCountry).HasMaxLength(100).IsRequired();
        builder.Property(o => o.PaymentMethod).HasMaxLength(50).IsRequired();
        builder.Property(o => o.Total).HasPrecision(5, 2).IsRequired();
        builder.Property(o => o.OrderStatus).HasMaxLength(1);
    }
}