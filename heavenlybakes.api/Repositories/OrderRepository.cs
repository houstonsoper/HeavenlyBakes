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
    
    public async Task<Order> AddOrderAsync(OrderPostDto order)
    {
        //Create a new Order
        var newOrder = new Order
        {
            CustomerId = order.CustomerId,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = 0, //This will updated later when the order items are added
            PaymentMethod = order.PaymentMethod,
            OrderStatus = order.OrderStatus
        };
        
        await _context.Orders.AddAsync(newOrder);
        await _context.SaveChangesAsync();
        
        return newOrder;
    }

    public async Task<OrderItem> AddOrderItemAsync(OrderItemPostDto orderItem)
    {
        var bake  = await _context.Bakes.FindAsync(orderItem.BakeId);
        var order = await _context.Orders.FindAsync(orderItem.OrderId);

        //Throw error if bake is not found
        if (bake == null)
        {
            throw new NullReferenceException("Bake not found");
        }
        
        //Create a new OrderItem
        var newOrderItem = new OrderItem
        {
            OrderId = orderItem.OrderId,
            CustomerId = orderItem.CustomerId,
            BakeId = orderItem.BakeId,
            Quantity = orderItem.Quantity,
            Price = bake.Price * orderItem.Quantity,
        };
        
        await _context.OrderItems.AddAsync(newOrderItem);
        
        //Update stock for the Bake based on the amount purchased in the order
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
        
        //Update total cost of the order based on the cost of the items
        if (order != null)
        {
            order.Total = order.Total + newOrderItem.Price;
        }
        
        await _context.SaveChangesAsync();
        
        return newOrderItem;
    }
}