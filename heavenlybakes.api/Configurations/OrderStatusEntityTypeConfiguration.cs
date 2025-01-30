using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class OrderStatusEntityTypeConfiguration : IEntityTypeConfiguration<OrderStatus>
{
    public void Configure(EntityTypeBuilder<OrderStatus> builder)
    {
        builder.HasData(
            new OrderStatus { Id = 1, Status = "In Progress" },
            new OrderStatus { Id = 2, Status = "Shipped" },
            new OrderStatus { Id = 3, Status = "Delivered" },
            new OrderStatus { Id = 4, Status = "Canceled" }
        );
    }
}