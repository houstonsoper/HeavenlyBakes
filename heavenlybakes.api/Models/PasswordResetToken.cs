using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.Models;

public class PasswordResetToken
{
    [Key]
    public Guid TokenId { get; set; } = Guid.NewGuid();
    public required Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddMinutes(30);
   
    public bool TokenUsed { get; set; } = false;
    
    //Navigation
    public User? User { get; set; }
}