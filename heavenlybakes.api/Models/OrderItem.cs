namespace heavenlybakes.api.Models;

public class OrderItem
{
    public int Id { get; set; }
    public required int OrderId { get; set; }
    public required string CustomerId { get; set; }
    public required int BakeId { get; set; }
    public required int Quantity { get; set; }
    public required decimal Price { get; set; }

    public Order Order { get; set; } = null!;
    public Bake Bake { get; set; } = null!;
}