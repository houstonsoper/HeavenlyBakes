using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.Models;

public class BakeType
{
    public int Id { get; set; }
    [Required (ErrorMessage = "Please enter bake type.")]
    [StringLength(50, ErrorMessage = "Bake type must be between 0 and 50.")]
    public string Type { get; set; } = string.Empty;
}