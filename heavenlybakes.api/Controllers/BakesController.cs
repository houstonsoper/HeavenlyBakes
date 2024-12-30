using heavenlybakes.api.Context;
using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Models;
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
    public async Task<IActionResult> GetBakes([FromQuery] int? limit, [FromQuery] int? offset)
    {
        var bakes = await _bakesRepository.GetAllBakesAsync();
        
        //Filter bakes by optional query paramaters if included
        if (limit.HasValue && limit != 0)
        { 
            bakes = bakes.Take(limit.Value);
        }

        if (offset.HasValue)
        {
            bakes = bakes.Skip(offset.Value);
        }
        
        //Map data to the Bake DTO
        var bakeDto = bakes.Select(b => b.ToBakeRequestDto());
        
        return Ok(bakeDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBakeByIdAsync(int id)
    {
        var bake = await _bakesRepository.GetBakeByIdAsync(id);

        if (bake == null)
        {
            return NotFound();
        }
        
        return Ok(bake.ToBakeRequestDto());
    }
}