using heavenlybakes.api.Contexts;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class OrderStatusesRepository : IOrderStatusesRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public OrderStatusesRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<OrderStatus>> GetOrderStatusesAsync()
    {
       return await _context.OrderStatus.ToListAsync();
    }

    public async Task<OrderStatus?> GetOrderStatusByIdAsync(int orderStatusId)
    {
        return await _context.OrderStatus.FindAsync(orderStatusId);
    }
}