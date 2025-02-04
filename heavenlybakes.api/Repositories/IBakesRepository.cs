using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IBakesRepository
{
    IQueryable<Bake> GetBakesQuery(); 
    Task<Bake?> GetBakeByIdAsync(int bakeId); 
    Task<IEnumerable<Bake>> GetBakeByTypeAsync(string category);
    Task<IEnumerable<BakeType>> GetBakeTypesAsync();
    Task<BakeType?> GetBakeTypeByNameAsync(string name);
    Task<BakeType?> GetBakeTypeByIdAsync(int id);
}