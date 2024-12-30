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

    public async Task<OrderItem> AddOrderItemAsync(OrderItemRequestDto orderItem)
    {
        var newOrderItem = new OrderItem
        {
            OrderId = orderItem.OrderId,
            CustomerId = orderItem.CustomerId,
            BakeId = orderItem.BakeId,
            Quantity = orderItem.Quantity,
            Price = orderItem.Price,
        };
        
        await _context.OrderItems.AddAsync(newOrderItem);
        
        var bake  = await _context.Bakes.FindAsync(orderItem.BakeId);

        //Update total quantity avaliable for the Bake based on the amount purchased in the order
        if (bake != null)
        { 
            var newQuantity = bake.Stock - orderItem.Quantity;

            //Prevent stock from going below negative
            if (newQuantity > 0)
            {
                bake.Stock = newQuantity;
            }
            else
            {
                throw new InvalidOperationException("Insufficient stock.");
            }
        }

        await _context.SaveChangesAsync();
        
        return newOrderItem;
    }
}