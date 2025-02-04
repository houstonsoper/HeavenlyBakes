using heavenlybakes.api.Contexts;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace heavenlybakes.api.Repositories;

public class BakesRepository : IBakesRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public BakesRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }

    public IQueryable<Bake> GetBakesQuery()
    {
        return _context.Bakes.AsQueryable();
    }

    public async Task<Bake?> GetBakeByIdAsync(int bakeId)
    {
        var bake = await _context.Bakes
            .Include(b => b.BakeType)
            .FirstOrDefaultAsync(b => b.Id == bakeId); 
        
        return bake;
    }

    public async Task<IEnumerable<Bake>> GetBakeByTypeAsync(string type)
    {
        return await _context.Bakes
            .Include(b => b.BakeType)
            .Where(b => b.BakeType.Type == type)
            .ToListAsync();
    }

    public async Task<IEnumerable<BakeType>> GetBakeTypesAsync()
    {
        return await _context.BakeTypes.ToListAsync();
    }
}