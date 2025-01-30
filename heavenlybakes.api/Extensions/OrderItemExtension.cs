using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class OrderItemExtension
{
    public static OrderItemRequestDto ToOrderItemRequestDto(this OrderItem orderItem)
    {
        return new OrderItemRequestDto
        {
            OrderId = orderItem.OrderId,
            BakeId = orderItem.BakeId,
            Quantity = orderItem.Quantity,
            Price = orderItem.Price,
        };
    }

    public static OrderItemForOrderPostDto ToOrderItemForOrderPostDto(this OrderItem orderItem)
    {
        return new OrderItemForOrderPostDto
        {
            BakeId = orderItem.BakeId,
            Quantity = orderItem.Quantity,
        };
    }

    public static OrderRequestItemDto ToAddOrderItemCustomerOrderRequestDto(this OrderItem orderItem)
    {
        return new OrderRequestItemDto
        {
            BakeId = orderItem.BakeId,
            Quantity = orderItem.Quantity,
            Price = orderItem.Price,
        };
    }
}