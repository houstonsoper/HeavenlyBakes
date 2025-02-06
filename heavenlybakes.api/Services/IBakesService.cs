using heavenlybakes.api.Models;

namespace heavenlybakes.api.Services;

public interface IBakesService
{
    Task<IEnumerable<Bake>> GetAllBakesAsync(string? search, int? limit, int? offset, int? bakeTypeId, string? orderBy);
    Task<BakeType> GetBakeTypeByNameAsync(string name);
}