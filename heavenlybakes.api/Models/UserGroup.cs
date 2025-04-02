using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.Models;

public class UserGroup
{
    [Key]
    public int GroupId { get; set; }
    
    [Required (ErrorMessage = "Usergroup name is required")]
    [StringLength(50, ErrorMessage = "Usergroup name cannot be longer than 50 characters")]
    public required string GroupName { get; set; }
}