using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using heavenlybakes.api.Enums;

namespace heavenlybakes.api.Models;

public class Order
{
    public int OrderId { get; set; }

    [Required(ErrorMessage = "UserId is required.")]
    public required Guid UserId { get; set; }

    [Required(ErrorMessage = "OrderDate is required.")]
    public DateTime OrderDate { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "ShippingAddress is required.")]
    [StringLength(200, ErrorMessage = "Shipping address cannot exceed 200 characters.")]
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

    [Range(0, int.MaxValue, ErrorMessage = "Total must be positive.")]
    public decimal Total { get; set; } = 0;

    [Required(ErrorMessage = "PaymentMethod is required.")]
    public required int PaymentMethodId { get; set; } = 1;

    // Use the OrderStatus enum instead of an integer
    [Required(ErrorMessage = "OrderStatus is required.")]
    public OrderStatusEnum OrderStatus { get; set; } 

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    [Required(ErrorMessage = "PaymentMethod is required.")]
    
    //Navigation
    public PaymentMethod? PaymentMethod { get; set; }
    public User? User { get; set; }
}