namespace heavenlybakes.api.DTOs;

public class BakeRequestDto
{
    public int Id { get; set; }
    public required string Name { get; set; } = string.Empty;
    
    public required decimal BasePrice { get; set; } = 0;
    
    public required string Type { get; set; } = string.Empty;   
    
    public required string ImageUrl { get; set; } = string.Empty;  
    
    public required string Description { get; set; } = string.Empty;
    
    public decimal Rating { get; set; } = 0;    
    
    public int Stock { get; set; } = 0;
    public int Discount { get; set; } = 0;
    public decimal Price { get; set; } = 0;

    public bool InProduction { get; set; } = false;
}