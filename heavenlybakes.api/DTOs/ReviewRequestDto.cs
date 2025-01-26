namespace heavenlybakes.api.DTOs;

public class ReviewRequestDto
{
    public int Id { get; set; }

    public Guid UserId { get; set; }
    
    public int BakeId { get; set; }
    public string Title { get; set; } = string.Empty;
    
    public string Feedback { get; set; } = string.Empty;

    public int Rating { get; set; }
    
    public DateTime CreateDateTime { get; set; }
}