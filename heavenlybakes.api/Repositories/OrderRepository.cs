using heavenlybakes.api.Contexts;
using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

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
            UserId = order.UserId,
            OrderDate = DateTime.Now,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            Total = 0, //This will updated later when the order items are added
            PaymentMethodId = order.PaymentMethodId,
            StatusId = 1
        };
        await _context.Orders.AddAsync(newOrder);
        await _context.SaveChangesAsync();
        
        //Add the items for the order
        foreach (var orderItem in order.OrderItems)
        {
            var bake  = await _context.Bakes.FindAsync(orderItem.BakeId);
            if (bake == null) throw new Exception("Bake not found");
            
                var newOrderItem = new OrderItemPostDto
                {
                    BakeId = orderItem.BakeId,
                    Quantity = orderItem.Quantity,
                };
                await AddOrderItemAsync(newOrder.OrderId, newOrderItem);
        }
        return newOrder;
    }

    public async Task<OrderItem> AddOrderItemAsync(int orderId, OrderItemPostDto orderItem)
    {
        var bake  = await _context.Bakes.FindAsync(orderItem.BakeId);
        var order = await _context.Orders.FindAsync(orderId);

        //Throw error if bake is not found
        if (bake == null)
        {
            throw new NullReferenceException("Bake not found");
        }
        
        //Create a new OrderItem
        var newOrderItem = new OrderItem
        {
            OrderId = orderId,
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
            if (newQuantity >= 0)
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

    public async Task<IEnumerable<Order>> GetCustomersOrders(string userId)
    {
        //Return the customers orders (including items) 
        return await _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.PaymentMethod)
            .Include(o => o.OrderStatus)
            .Where(o => o.UserId == Guid.Parse(userId) && o.OrderItems.Count > 0) 
            .ToListAsync();
    }

    public IQueryable<Order> GetAllOrdersQuery()
    {
        return _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.PaymentMethod)
            .Include(o => o.OrderStatus)
            .AsQueryable();
    }
}