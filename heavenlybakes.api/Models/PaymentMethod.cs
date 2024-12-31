using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.Models;

public class PaymentMethod
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "PaymentMethod is required")]
    [StringLength(50, ErrorMessage = "PaymentMethod cannot exceed 50 characters.")]
    public required string Method { get; set; }
}