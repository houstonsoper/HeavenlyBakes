using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PaymentController : Controller
{
    private readonly IPaymentRepository _paymentRepository;

    public PaymentController(IPaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
    }

    [HttpGet("/PaymentMethods")]
    public async Task<IActionResult> GetPaymentMethods()
    {
        return Ok(await _paymentRepository.GetPaymentMethods());
    }
}