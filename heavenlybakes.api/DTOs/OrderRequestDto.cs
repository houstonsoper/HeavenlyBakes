using heavenlybakes.api.Models;

namespace heavenlybakes.api.DTOs;

public class OrderRequestDto
{
    public int OrderId { get; set; }
    public Guid UserId { get; set; }
    public DateTime OrderDate { get; set; } 
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingPostalCode { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = string.Empty;
    public decimal Total { get; set; } 
    public int PaymentMethodId { get; set; }
    public int OrderStatusId { get; set; }
    public List<OrderRequestItemDto> OrderItems { get; set; } = [];
}