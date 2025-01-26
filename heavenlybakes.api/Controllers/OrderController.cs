using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;
[ApiController]
[Route("[controller]")]

public class OrderController : Controller
{
    private readonly IOrderRepository _orderRepository;

    public OrderController(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
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
        var ordersDto = orders.Select(o => o.ToCustomerOrdersRequestDto());
        
        return Ok(ordersDto);
    }
}