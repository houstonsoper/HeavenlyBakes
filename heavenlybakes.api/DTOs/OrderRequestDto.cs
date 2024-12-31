using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class OrderRequestDto
{
    public int OrderId { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    
    public DateTime OrderDate { get; set;} = DateTime.Now;
    
    public  string ShippingAddress { get; set;} = string.Empty;
    
    public  string ShippingCity { get; set; } = string.Empty;
    
    public  string ShippingPostalCode { get; set;} = string.Empty;
    
    public string ShippingCountry { get; set; } = string.Empty;
    
    public decimal Total { get; set;}

    public int PaymentMethodId { get; set; }
    
    public int OrderStatus { get; set;} 
}

