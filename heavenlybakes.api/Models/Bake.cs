using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.Models;

public class Bake
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    [StringLength(50, ErrorMessage = "Name cannot exceed 50 characters.")]
    public required string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Price is required.")]
    [Range(0.01, 999.99, ErrorMessage = "Price must be between 0.01 and 999.99.")]
    public required decimal Price { get; set; } = 0;

    [Required(ErrorMessage = "Type is required.")]
    [StringLength(20, ErrorMessage = "Type cannot exceed 20 characters.")]
    public required string Type { get; set; } = string.Empty;

    [Required(ErrorMessage = "ImageUrl is required.")]
    [StringLength(500, ErrorMessage = "ImageUrl cannot exceed 500 characters.")]
    public required string ImageUrl { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description is required.")]
    [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
    public required string Description { get; set; } = string.Empty;

    [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5.")]
    public decimal Rating { get; set; } = 0;
}