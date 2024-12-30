using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class OrderRequestDto
{
    [Required(ErrorMessage = "CustomerId is required.")]
    public required string CustomerId { get; set; }

    [Required(ErrorMessage = "OrderDate is required.")]
    public DateTime OrderDate { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "ShippingAddress is required.")]
    [StringLength(200, ErrorMessage = "Shipping address cannot cannot exceed than 200 characters.")]
    public required string ShippingAddress { get; set; }

    [Required(ErrorMessage = "ShippingCity is required.")]
    [StringLength(100, ErrorMessage = "Shipping city cannot exceed 100 characters.")]
    public required string ShippingCity { get; set; }

    [Required(ErrorMessage = "ShippingPostalCode is required.")]
    [StringLength(20, ErrorMessage = "Shipping postal code cannot exceed 20 characters.")]
    public required string ShippingPostalCode { get; set; }

    [Required(ErrorMessage = "ShippingCountry is required.")]
    [StringLength(100, ErrorMessage = "Shipping country cannot exceed 100 characters.")]
    public required string ShippingCountry { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Total must be positive")]
    public decimal Total { get; set; } = 0;

    [Required(ErrorMessage = "PaymentMethod is required.")]
    [StringLength(50, ErrorMessage = "Payment method cannot exceed 50 characters.")]
    public required string PaymentMethod { get; set; }

    [Range(0, 3, ErrorMessage = "OrderStatus must be a valid status.")]
    public int OrderStatus { get; set; } = 0;
}

