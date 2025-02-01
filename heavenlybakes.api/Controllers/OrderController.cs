using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Repositories;
using heavenlybakes.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;
[ApiController]
[Route("[controller]")]

public class OrderController : Controller
{
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderService _orderService;

    public OrderController(IOrderRepository orderRepository, IOrderService orderService)
    {
        _orderRepository = orderRepository;
        _orderService = orderService;
    }
    
    [HttpPost]
    public async Task<IActionResult> AddOrder([FromBody] OrderPostDto order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); 
        }
        
        var newOrder = await _orderRepository.AddOrderAsync(order);
        
        return Ok(newOrder.ToOrderRequestDto());
    }
    
    [HttpPost("{orderId}/item")]
    public async Task<IActionResult> AddOrderItems([FromRoute]int orderId, [FromBody] List<OrderItemPostDto> orderItems)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); 
        }
        
        var orderItemsDto = new List<OrderItemRequestDto>();

        //Iterate through orderItems and add them to the database
        foreach (var orderItem in orderItems)
        {
            var newOrderItem = await _orderRepository.AddOrderItemAsync(orderId, orderItem);
            orderItemsDto.Add(newOrderItem.ToOrderItemRequestDto());
        }

        return Ok(orderItemsDto);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetCustomersOrders([FromRoute] string userId)
    {
        var orders = await _orderRepository.GetCustomersOrders(userId);
        var ordersDto = orders.Select(o => o.ToOrderRequestDto());
        
        return Ok(ordersDto);
    }

    [HttpGet("Search")]
    public async Task<IActionResult> GetOrders([FromQuery] string? search, [FromQuery] int? statusId, [FromQuery] int? offset, [FromQuery] int? limit, string? fromDate)
    {
        var orders = await _orderService.GetOrders(search, statusId, offset, limit, fromDate);
        var ordersDto = orders.Select(o => o.ToOrderRequestDto());
        return Ok(ordersDto);
    }
}