using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Services;

public class BakesService : IBakesService
{
    private readonly IBakesRepository _bakesRepository;

    public BakesService(IBakesRepository bakesRepository)
    {
        _bakesRepository = bakesRepository;
    }
    public async Task<IEnumerable<Bake>> GetAllBakesAsync(string? search, int? limit, int? offset, int? bakeTypeId)
    {
        var query =  _bakesRepository.GetBakesQuery();

        if (bakeTypeId.HasValue && bakeTypeId.Value != 0)
        {
            query = query.Where(b => b.BakeTypeId == bakeTypeId);
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

    public async Task<BakeType> GetBakeTypeByIdAsync(int bakeTypeId)
    {
        var bakeType = await _bakesRepository.GetBakeTypeByIdAsync(bakeTypeId)
            ?? throw new NullReferenceException($"Bake type with id {bakeTypeId} not found");
        
        return bakeType;
    }
}