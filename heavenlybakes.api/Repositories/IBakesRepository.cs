using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IBakesRepository
{
    Task<IEnumerable<Bake>> GetAllBakesAsync(); 
    Task<Bake> GetBakeByIdAsync(int bakeId);
}