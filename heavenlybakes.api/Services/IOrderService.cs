using heavenlybakes.api.Models;

namespace heavenlybakes.api.Services;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetOrders(string? search, int? statusId, int? offset, int? limit, string? fromDate);
    Task UpdateOrderStatusAsync(int orderId, int orderStatusId);
    Task<IEnumerable<Order>> GetCustomersOrders(string userId, int? limit, int? offset);
}