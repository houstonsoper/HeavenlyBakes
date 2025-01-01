using System.ComponentModel.DataAnnotations;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.DTOs;

public class OrderItemForOrderPostDto 
{
    public required int BakeId { get; set; }
    
    [Range(1, 99, ErrorMessage = "Quantity must be between 1 and 99")]
    public required int Quantity { get; set; }
    
}