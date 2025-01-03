using heavenlybakes.api.Enums;
using heavenlybakes.api.Migrations;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.DTOs;

public class CustomerOrdersRequestDto
{
    public int OrderId { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; } 
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingPostalCode { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = string.Empty;
    public decimal Total { get; set; } 
    public string OrderStatus { get; set; } = OrderStatusEnum.InProgress.ToString();
    public int PaymentMethod { get; set; }
    public List<AddOrderItemCustomerOrderRequestDto> OrderItems { get; set; } = [];
}