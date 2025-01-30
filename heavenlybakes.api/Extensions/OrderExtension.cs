using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class OrderExtension
{
    public static OrderRequestDto ToOrderRequestDto(this Order order)
    {
        return new OrderRequestDto
        {
            OrderId = order.OrderId,
            UserId = order.UserId,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = order.Total,
            OrderStatus = order.OrderStatus,
            PaymentMethod = new PaymentMethodDto
            {
                Id = order.PaymentMethodId,
                Method = order.PaymentMethod.Method
            },
            OrderItems = order.OrderItems.Select(item => new OrderRequestItemDto
            {
                BakeId = item.BakeId,
                Quantity = item.Quantity,
                Price = item.Price,
            }).ToList()
        };
    }
}