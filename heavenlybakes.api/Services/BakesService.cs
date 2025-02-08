using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Services;

public class BakesService : IBakesService
{
    private readonly IBakesRepository _bakesRepository;

    public BakesService(IBakesRepository bakesRepository, IReviewRepository reviewRepository)
    {
        _bakesRepository = bakesRepository;
    }
    public async Task<IEnumerable<Bake>> GetAllBakesAsync(string? search, int? limit, int? offset, int? bakeTypeId, string? orderBy)
    {
        var query =  _bakesRepository.GetBakesQuery();

        if (bakeTypeId.HasValue && bakeTypeId.Value != 0)
        {
            query = query.Where(b => b.BakeTypeId == bakeTypeId);
        }
        
        if (!string.IsNullOrEmpty(orderBy)) 
        {
            switch (orderBy) 
            {
                case "priceDesc":
                    query = query.OrderByDescending(o => o.Price - (o.Price / 100 * o.Discount));
                    break;
                case "priceAsc":
                    query = query.OrderBy(o => o.Price - (o.Price / 100 * o.Discount));
                    break;
                case "nameDesc":
                    query = query.OrderByDescending(o => o.Name);
                    break;
                case "nameAsc":
                    query = query.OrderBy(o => o.Name);
                    break;
                case "discountDesc":
                    query = query.OrderByDescending(o => o.Discount);
                    break;
                case "discountAsc":
                    query = query.OrderBy(o => o.Discount);
                    break;
                default:
                    return query;
            }
        }
        
        if (offset.HasValue)
        {
            query = query.Skip(offset.Value);
        }
        
        if (limit.HasValue && limit != 0)
        { 
            query = query.Take(limit.Value);
        } 

        return await query.Include(b => b.BakeType).ToListAsync();
    }

    public async Task<BakeType> GetBakeTypeByNameAsync(string name)
    {
        var bakeType = await _bakesRepository.GetBakeTypeByNameAsync(name)
            ?? throw new NullReferenceException("Bake type not found");
        
        return bakeType;
    }
}