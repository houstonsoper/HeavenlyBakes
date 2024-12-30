using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class OrderItemExtension
{
    public static OrderItemRequestDto ToOrderItemDto(this OrderItem orderItem)
    {
        return new OrderItemRequestDto
        {
            OrderId = orderItem.OrderId,
            CustomerId = orderItem.CustomerId,
            BakeId = orderItem.BakeId,
            Quantity = orderItem.Quantity,
            Price = orderItem.Price,
        };
    }
}