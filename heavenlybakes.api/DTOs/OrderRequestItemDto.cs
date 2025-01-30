namespace heavenlybakes.api.DTOs;

public class OrderRequestItemDto
{
    public int BakeId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}