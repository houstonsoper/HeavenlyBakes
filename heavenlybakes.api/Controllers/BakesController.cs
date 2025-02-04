using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using heavenlybakes.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("[controller]")]

public class BakesController : ControllerBase
{
    private readonly IBakesRepository _bakesRepository;
    private readonly IBakesService _bakesService;

    public BakesController(IBakesRepository bakesRepository, IBakesService bakesService)
    {
        _bakesRepository = bakesRepository;
        _bakesService = bakesService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetBakes([FromQuery] string? search, [FromQuery] int? limit, [FromQuery] int? offset, [FromQuery] int? bakeTypeId)
    {
        var bakes = await _bakesService.GetAllBakesAsync(search, limit, offset, bakeTypeId);
        
        //Map data to the Bake DTO
        var bakeDto = bakes.Select(b => b.ToBakeRequestDto());
        
        return Ok(bakeDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBakeById([FromRoute] int id)
    {
        var bake = await _bakesRepository.GetBakeByIdAsync(id);

        if (bake == null)
        {
            return NotFound();
        }
        
        return Ok(bake.ToBakeRequestDto());
    }
    
    [HttpGet("types")]
    public async Task<IActionResult> GetBakeTypes()
    {
        var bakeTypes = await _bakesRepository.GetBakeTypesAsync();
        var bakeTypesDto = bakeTypes.Select(bt => bt.ToBakeTypeRequestDto());

        return Ok(bakeTypesDto);
    }
    
        
    [HttpGet("types/{bakeTypeId}")]
    public async Task<IActionResult> GetBakeTypes([FromRoute] int bakeTypeId)
    {
        var bakeType = await _bakesService.GetBakeTypeByIdAsync(bakeTypeId);

        return Ok(bakeType.ToBakeTypeRequestDto());
    }
}