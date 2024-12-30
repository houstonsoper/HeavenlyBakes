using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class OrderExtension
{
    public static OrderRequestDto ToOrderRequestDto(this Order order)
    {
        return new OrderRequestDto
        {
            CustomerId = order.CustomerId,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = order.Total,
            PaymentMethod = order.PaymentMethod
        };
    }
}