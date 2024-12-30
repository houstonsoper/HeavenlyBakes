using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IOrderRepository
{
    public Task<Order> AddOrderAsync(OrderRequestDto order);
}