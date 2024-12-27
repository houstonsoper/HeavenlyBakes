using heavenlybakes.api.Context;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class BakesRepository : IBakesRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public BakesRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Bake>> GetAllBakesAsync()
    {
        return await _context.Bakes.ToListAsync();
    }

    public async Task<Bake> GetBakeByIdAsync(int bakeId)
    {
        var bake = await _context.Bakes.FindAsync(bakeId);

        if (bake == null)
        {
            return null;
        }
        return bake;
    }
}