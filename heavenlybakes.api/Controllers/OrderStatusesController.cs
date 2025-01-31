using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;
[ApiController]
[Route("[controller]")]

public class OrderStatusesController : Controller
{
    private readonly IOrderStatusesRepository _orderStatusesRepository;

    public OrderStatusesController(IOrderStatusesRepository orderStatusesRepository)
    {
        _orderStatusesRepository = orderStatusesRepository;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetOrderStatusesAsync()
    {
        var orderStatuses =  await _orderStatusesRepository.GetOrderStatusesAsync();
        return Ok(orderStatuses);
    }
}