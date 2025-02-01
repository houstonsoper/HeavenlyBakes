using heavenlybakes.api.Models;

namespace heavenlybakes.api.Services;

public interface IOrderStatusesService
{
    Task<OrderStatus> GetOrderStatusByIdAsync(int orderStatusId);
}