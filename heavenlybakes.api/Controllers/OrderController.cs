﻿using heavenlybakes.api.DTOs;
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
    
    [HttpPost("/AddOrder")]
    public async Task<IActionResult> AddOrder([FromBody] OrderPostDto order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); 
        }
        
        var newOrder = await _orderRepository.AddOrderAsync(order);
        
        return Ok(newOrder.ToOrderRequestDto());
    }
    
    [HttpPost("/AddOrderItem")]
    public async Task<IActionResult> AddOrder([FromBody] OrderItemPostDto orderItem)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); 
        }
        
        var newOrderItem = await _orderRepository.AddOrderItemAsync(orderItem);
        
        return Ok(newOrderItem.ToOrderItemRequestDto());
    }
}