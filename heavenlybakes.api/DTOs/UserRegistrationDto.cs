using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class UserRegistrationDto
{
    [Required (ErrorMessage = "Forename is required")]
    [StringLength(20, ErrorMessage = "Forename must be between 1 and 20 characters", MinimumLength = 1)]
    public required string Forename { get; set; }
    
    [Required (ErrorMessage = "Surname is required")]
    [StringLength(20, ErrorMessage = "Surname must be between 1 and 20 characters", MinimumLength = 1)]
    public required string Surname { get; set; }
    
    [Required (ErrorMessage = "Email is required")]
    [StringLength(254, ErrorMessage = "Email must be between 5 and 254 characters", MinimumLength = 5)]
    public required string Email { get; set; }
    
    [Required (ErrorMessage = "Password is required")]
    [StringLength(15, ErrorMessage = "Password must be between 5 and 15 characters", MinimumLength = 5)]
    public required string Password { get; set; }
}