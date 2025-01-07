using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class BakeTypeExtension
{
    public static BakeTypeRequestDto ToBakeTypeRequestDto(this BakeType bakeType)
    {
        return new BakeTypeRequestDto
        {
            Id = bakeType.Id,
            Type = bakeType.Type,
        };
    }
}