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
            BasePrice = bake.Price,
            Type = bake.Type,
            ImageUrl = bake.ImageUrl,
            Description = bake.Description,
            Rating = bake.Rating,
            Stock = bake.Stock,
            Discount = bake.Discount,  
            Price = decimal.Round(((100 - bake.Discount) * bake.Price) / 100,2),
            InProduction = bake.InProduction,
        };
    }
}