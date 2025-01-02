namespace heavenlybakes.api.DTOs;

public class AddOrderItemCustomerOrderRequestDto
{
    public int BakeId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}