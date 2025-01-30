using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }
    
    public async Task<IEnumerable<Order>> GetOrders(string? search, int? statusId, int? offset, int? limit)
    {
        var query = _orderRepository.GetAllOrdersQuery();
        var searchTerm = search?.ToLower();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(o =>
                o.OrderId.ToString().Contains(searchTerm) ||
                o.User.Forename.ToLower().Contains(searchTerm) ||
                o.User.Email.ToLower().Contains(searchTerm) ||
                o.OrderItems.Any(oi => oi.Bake.Name.ToLower().Contains(searchTerm))
            );
        }

        if (statusId.HasValue)
        {
            query = query.Where(o => o.StatusId == statusId);
        }
        
        
        if (offset.HasValue)
        {
            query = query.Skip(offset.Value);
        }
        
        if (limit.HasValue)
        {
            query = query.Take(limit.Value);
        }
        
        query = query.OrderByDescending(o => o.OrderDate);

        return await query.ToListAsync();
    }
}

