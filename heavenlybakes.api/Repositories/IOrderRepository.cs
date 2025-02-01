using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IOrderRepository
{
    Task<Order> AddOrderAsync(OrderPostDto order);
    Task<OrderItem> AddOrderItemAsync(int orderId, OrderItemPostDto orderItem);
    Task<IEnumerable<Order>> GetCustomersOrders(string userId);
    IQueryable<Order> GetAllOrdersQuery();
    Task UpdateOrderStatusAsync(Order order, int orderStatusId);
    Task <Order?> GetOrderByIdAsync(int orderId);
}