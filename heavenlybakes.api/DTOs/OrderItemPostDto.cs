using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class OrderItemPostDto
{
    public required int BakeId { get; set; }
    
    [Range(1, 99, ErrorMessage = "Quantity must be between 1 and 99")]
    public required int Quantity { get; set; }
}