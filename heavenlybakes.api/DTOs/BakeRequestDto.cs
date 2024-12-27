namespace heavenlybakes.api.DTOs;

public class BakeRequestDto
{
    public int Id { get; set; }
    
    public required string Name { get; set; } = string.Empty;
    
    public required decimal Price { get; set; } = 0;
    
    public required string Type { get; set; } = string.Empty;   
    
    public required string ImageUrl { get; set; } = string.Empty;  
    
    public required string Description { get; set; } = string.Empty;
    
    public decimal Rating { get; set; } = 0;    
}