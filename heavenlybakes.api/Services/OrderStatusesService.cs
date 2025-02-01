using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;

namespace heavenlybakes.api.Services;

public class OrderStatusesService : IOrderStatusesService
{
    private readonly IOrderStatusesRepository _orderStatusesRepository;

    public OrderStatusesService(IOrderStatusesRepository orderStatusesRepository)
    {
        _orderStatusesRepository = orderStatusesRepository;
    }
    
    public async Task<OrderStatus> GetOrderStatusByIdAsync(int orderStatusId)
    {
        return await _orderStatusesRepository.GetOrderStatusByIdAsync(orderStatusId)
            ?? throw new NullReferenceException("Order status not found");
    }
}