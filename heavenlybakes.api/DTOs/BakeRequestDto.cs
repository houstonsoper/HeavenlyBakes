using heavenlybakes.api.Models;

namespace heavenlybakes.api.DTOs;

public class BakeRequestDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public decimal BasePrice { get; set; } = 0;
    
    public BakeType BakeType { get; set; } 
    
    public string ImageUrl { get; set; } = string.Empty;  
    
    public string Description { get; set; } = string.Empty;
    
    public decimal Rating { get; set; } = 0;    
    
    public int Stock { get; set; } = 0;
    public int Discount { get; set; } = 0;
    public decimal Price { get; set; } = 0;

    public bool InProduction { get; set; } = false;
}