using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using heavenlybakes.api.Enums;

namespace heavenlybakes.api.Models;

public class Review
{
    [Required(ErrorMessage = "CustomerId is required.")]
    public required string CustomerId { get; set; }
    
    [Required(ErrorMessage = "BakeId is required.")]
    public required int BakeId { get; set; }
    
    [Required(ErrorMessage = "Title is required.")]
    [MaxLength(50, ErrorMessage = "Maximum length is 50 characters.")]
    public required string Title { get; set; } 
    
    [Required(ErrorMessage = "Feedback is required.")]
    [MaxLength(500, ErrorMessage = "Maximum length is 500 characters.")]
    public required string Feedback { get; set; } 

    [Required(ErrorMessage = "Rating is required.")]
    [Range(1, 5)]
    public required int Rating { get; set; }
    
    public DateTime CreateDateTime { get; set; } = DateTime.Now;
    
    //Navigation
    public Bake? Bake { get; set; } 
}