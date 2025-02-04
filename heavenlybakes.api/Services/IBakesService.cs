using heavenlybakes.api.Models;

namespace heavenlybakes.api.Services;

public interface IBakesService
{
    Task<IEnumerable<Bake>> GetAllBakesAsync(string? search, int? limit, int? offset, int? bakeTypeId);
    Task<BakeType> GetBakeTypeByNameAsync(string name);
}