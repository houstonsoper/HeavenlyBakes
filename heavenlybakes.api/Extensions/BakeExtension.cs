using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class BakeExtension
{
    public static BakeRequestDto ToBakeRequestDto(this Bake bake)
    {
        return new BakeRequestDto
        {
            Id = bake.Id,
            Name = bake.Name,
            Price = bake.Price,
            Type = bake.Type,
            ImageUrl = bake.ImageUrl,
            Description = bake.Description,
            Rating = bake.Rating,
            Stock = bake.Stock,
            InProduction = bake.InProduction,
        };
    }
}