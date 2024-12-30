using System.ComponentModel.DataAnnotations;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.DTOs;

public class OrderItemRequestDto
{
    public required int OrderId { get; set; }
    public required string CustomerId { get; set; }
    public required int BakeId { get; set; }
    
    [Range(1, 99, ErrorMessage = "Quantity must be between 1 and 99")]
    public required int Quantity { get; set; }
    
    [Range(0.01, 999.99, ErrorMessage = "Price must be between 0.01 and 999.99")]
    public required decimal Price { get; set; }
}