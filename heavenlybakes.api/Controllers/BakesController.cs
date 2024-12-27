using heavenlybakes.api.Context;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("[controller]")]

public class BakesController : ControllerBase
{
    private readonly IBakesRepository _bakesRepository;

    public BakesController(IBakesRepository bakesRepository)
    {
        _bakesRepository = bakesRepository;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetBakes()
    {
        var bakes = await _bakesRepository.GetAllBakesAsync();
        
        if(!bakes.Any()) return NotFound();

        //Map data to the Bake DTO
        var bakeDto = bakes.Select(b => b.ToBakeDto());
        
        return Ok(bakeDto);
    }
}