using heavenlybakes.api.Context;
using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public OrderRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }
    
    public async Task<Order> AddOrderAsync(OrderRequestDto order)
    {
        var newOrder = new Order
        {
            CustomerId = order.CustomerId,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = order.Total,
            PaymentMethod = order.PaymentMethod,
            OrderStatus = order.OrderStatus
        };
        
        await _context.Orders.AddAsync(newOrder);
        await _context.SaveChangesAsync();
        
        return newOrder;
    }
}