using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("bakes")]

public class BakesController : ControllerBase
{
    public IActionResult Index()
    {
        return Ok();
    }
}