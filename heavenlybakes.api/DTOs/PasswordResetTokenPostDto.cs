using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class PasswordResetTokenPostDto
{
    [Required (ErrorMessage = "Email is required")]
    public required string Email { get; set; }
}