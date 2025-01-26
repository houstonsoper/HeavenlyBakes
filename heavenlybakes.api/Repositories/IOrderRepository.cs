using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IOrderRepository
{
    public Task<Order> AddOrderAsync(OrderPostDto order);
    public Task<OrderItem> AddOrderItemAsync(int orderId, OrderItemPostDto orderItem);
    public Task<IEnumerable<Order>> GetCustomersOrders(string userId);
}