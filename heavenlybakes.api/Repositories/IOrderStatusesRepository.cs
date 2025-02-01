using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IOrderStatusesRepository
{
    Task<IEnumerable<OrderStatus>> GetOrderStatusesAsync();
    Task<OrderStatus?> GetOrderStatusByIdAsync(int orderStatusId);
}