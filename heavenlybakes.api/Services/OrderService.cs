using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderStatusesService _orderStatusesService;

    public OrderService(IOrderRepository orderRepository, IOrderStatusesService orderStatusesService)
    {
        _orderRepository = orderRepository;
        _orderStatusesService = orderStatusesService;
    }
    
    public async Task<IEnumerable<Order>> GetOrders(string? search, int? statusId, int? offset, int? limit, string? fromDate)
    {
        var query = _orderRepository.GetAllOrdersQuery();
        var searchTerm = search?.ToLower();
        
        //Filter query by fromDate (If supplied) by parsing it into a DateTime
        if (!string.IsNullOrEmpty(fromDate) && DateTime.TryParse(fromDate, out var fromDateDateParsed))
        {
            query = query.Where(o => o.OrderDate >= fromDateDateParsed);
        }
        
        //Filter by searchTerm (If supplied)
        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(o =>
                o.OrderId.ToString().Contains(searchTerm) ||
                o.User.Forename.ToLower().Contains(searchTerm) ||
                o.User.Email.ToLower().Contains(searchTerm) ||
                o.OrderItems.Any(oi => oi.Bake.Name.ToLower().Contains(searchTerm))
            );
        }

        //Filter by order status (If suppplied)
        if (statusId.HasValue && statusId != 0)
        {
            query = query.Where(o => o.StatusId == statusId);
        }
        query = query.OrderByDescending(o => o.OrderId);
        
        
        //Filter by offset (If supplied)
        if (offset.HasValue)
        {
            query = query.Skip(offset.Value);
        }
        
        //Filter by limit (If supplied)
        if (limit.HasValue && limit != 0)
        {
            query = query.Take(limit.Value);
        }

        return await query.ToListAsync();
    }

    public async Task UpdateOrderStatusAsync(int orderId, int orderStatusId)
    {
        //Find order 
        var order = await _orderRepository.GetOrderByIdAsync(orderId)
            ?? throw new KeyNotFoundException("Order not found");
        
        //Check to see if the status exists 
        var status = await _orderStatusesService.GetOrderStatusByIdAsync(orderStatusId);
        
        //Update order
        await _orderRepository.UpdateOrderStatusAsync(order, status.Id);
    }
}

