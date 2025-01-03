using heavenlybakes.api.DTOs;
using heavenlybakes.api.Enums;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class OrderExtension
{
    public static OrderRequestDto ToOrderRequestDto(this Order order)
    {
        return new OrderRequestDto
        {
            OrderId = order.OrderId,
            CustomerId = order.CustomerId,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = order.Total,
            PaymentMethodId = order.PaymentMethodId
        };
    }

    public static CustomerOrdersRequestDto ToCustomerOrdersRequestDto(this Order order)
    {
        return new CustomerOrdersRequestDto
        {
            OrderId = order.OrderId,
            CustomerId = order.CustomerId,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = order.Total,
            OrderStatus = order.OrderStatus.ToString(),
            PaymentMethod = order.PaymentMethodId,
            OrderItems = order.OrderItems.Select(item => new AddOrderItemCustomerOrderRequestDto
            {
                BakeId = item.BakeId,
                Quantity = item.Quantity,
                Price = item.Price,
            }).ToList()
        };
    }
}