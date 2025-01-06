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
        if (offset.HasValue)
        {
            bakes = bakes.Skip(offset.Value);
        }
        
        if (limit.HasValue && limit != 0)
        { 
            bakes = bakes.Take(limit.Value);
        }
        
        //Map data to the Bake DTO
        var bakeDto = bakes.Select(b => b.ToBakeRequestDto());
        
        return Ok(bakeDto);
    }

    [HttpGet("id/{id}")]
    public async Task<IActionResult> GetBakeById([FromRoute] int id)
    {
        var bake = await _bakesRepository.GetBakeByIdAsync(id);

        if (bake == null)
        {
            return NotFound();
        }
        
        return Ok(bake.ToBakeRequestDto());
    }

    [HttpGet("type/{type}")]
    public async Task<IActionResult> GetBakesByType([FromRoute] string type)
    {
        var bakes = await _bakesRepository.GetBakeByTypeAsync(type);
        var bakesDto = new List<BakeRequestDto>();
        
        //Iterate through each bake and format them as BakeRequestDto
        foreach (var bake in bakes) 
        { 
            bake.ToBakeRequestDto();
            bakesDto.Add(bake.ToBakeRequestDto());
        }

        return Ok(bakesDto);
    }
}