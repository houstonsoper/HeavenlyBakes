using heavenlybakes.api.Context;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public ReviewRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Review>> GetReviewsByBake(int bakeId)
    {
            return await _context.Reviews
                .Where(r => r.BakeId == bakeId)
                .ToListAsync();
    }
    
    public async Task<IEnumerable<Review>> GetReviewByCustomerIdAsync(string customerId)
    {
        return await _context.Reviews
            .Where(r => r.CustomerId == customerId)
            .ToListAsync(); 
    }
}