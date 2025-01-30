using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.Models;

public class OrderStatus
{
    [Key]
    public required int Id { get; set; }
    
    [Required (ErrorMessage = "Please enter the order status")]
    [StringLength(100) ]
    public required string Status { get; set; }
}