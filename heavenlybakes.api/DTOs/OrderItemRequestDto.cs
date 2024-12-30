using System.ComponentModel.DataAnnotations;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.DTOs;

public class OrderItemRequestDto
{
    public int OrderId { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public int BakeId { get; set; }
    
    public int Quantity { get; set; } = 0;

    public decimal Price { get; set; } = 0;
}