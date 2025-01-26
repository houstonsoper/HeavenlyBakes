using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class UserPasswordResetDto
{
    [Required (ErrorMessage = "Password reset token is required")]
    public required Guid TokenId { get; set; } 
    
    [Required (ErrorMessage = "Password is required")]
    [StringLength(15, ErrorMessage = "Password must be between 5 and 15 characters", MinimumLength = 5)]
    public required string Password { get; set; } 
}