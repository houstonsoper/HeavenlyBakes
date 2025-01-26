namespace heavenlybakes.api.DTOs;

public class PasswordResetTokenRequestDto
{
    public Guid TokenId { get; set; } 
    public DateTime CreatedAt { get; set; } 
    public DateTime ExpiresAt { get; set; } 
    public bool TokenUsed { get; set; } 
}