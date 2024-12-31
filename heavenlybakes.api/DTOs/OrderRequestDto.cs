using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class OrderRequestDto
{
    public string CustomerId { get; set; } = string.Empty;
    
    public DateTime OrderDate { get; set;} = DateTime.Now;
    
    public  string ShippingAddress { get; set;} = string.Empty;
    
    public  string ShippingCity { get; set; } = string.Empty;
    
    public  string ShippingPostalCode { get; set;} = string.Empty;
    
    public string ShippingCountry { get; set; } = string.Empty;
    
    public decimal Total { get; set;} = 0;

    public int PaymentMethodId { get; set; }
    
    public int OrderStatus { get; set;} = 0;
}

