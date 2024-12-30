namespace heavenlybakes.api.Models;

public class Order
{
    public int OrderId { get; set; }
    public required string CustomerId { get; set; } 
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public required string ShippingAddress { get; set; } 
    public required string ShippingCity { get; set; }  
    public required string ShippingPostalCode { get; set; }  
    public required string ShippingCountry { get; set; }  
    public decimal Total { get; set; } = 0;  
    public required string PaymentMethod { get; set; }
    public int OrderStatus { get; set; } = 0;
    
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}