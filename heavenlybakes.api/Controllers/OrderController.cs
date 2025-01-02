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
        
        var newOrderItems = new List<OrderItemRequestDto>();

        //Iterate through orderItems and add them to the database
        foreach (var orderItem in orderItems)
        {
            var newOrderItem = await _orderRepository.AddOrderItemAsync(orderId, orderItem);
            newOrderItems.Add(newOrderItem.ToOrderItemRequestDto());
        }

        return Ok(newOrderItems);
    }

    [HttpGet("{customerId}")]
    public async Task<IActionResult> GetCustomersOrders([FromRoute] string customerId)
    {
        var orders = await _orderRepository.GetCustomersOrders(customerId);
        var customerOrders = new List<CustomerOrdersRequestDto>();

        foreach (var order in orders)
        {
            order.ToCustomerOrdersRequestDto();
            customerOrders.Add(order.ToCustomerOrdersRequestDto());
        }
        
        return Ok(customerOrders);
    }
}