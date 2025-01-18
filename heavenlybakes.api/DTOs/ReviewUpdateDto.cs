using System.ComponentModel.DataAnnotations;

namespace heavenlybakes.api.DTOs;

public class ReviewUpdateDto
{
    [Required (ErrorMessage = "Please enter a title")]
    [MaxLength(100, ErrorMessage = "Maximum length is 50 characters.")]
    public required string Title { get; set; }
    
    [Required (ErrorMessage = "Please enter feedback")]
    [MaxLength(500, ErrorMessage = "Maximum length is 500 characters.")]
    public required string Feedback { get; set; }
    
    [Required (ErrorMessage = "Please enter a rating")]
    [Range(1, 5)]
    public required int Rating { get; set; }
}