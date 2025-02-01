using heavenlybakes.api.Models;

namespace heavenlybakes.api.Services;

public interface IOrderService
{
    public Task<IEnumerable<Order>> GetOrders(string? search, int? statusId, int? offset, int? limit, DateTime? startDate, DateTime? endDate);
}