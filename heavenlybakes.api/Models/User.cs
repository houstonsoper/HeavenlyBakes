using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heavenlybakes.api.Models;

public class User
{
    public Guid UserId { get; set; } = Guid.NewGuid();
    
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
    [NotMapped] 
    public required string Password { get; set; }
    
    public int UserGroupId { get; set; } = 1;

    public DateTime CreateDateTime { get; set; } = DateTime.UtcNow;
    
    //Navigation
    public UserGroup UserGroup { get; set; }
}
