﻿using System.ComponentModel.DataAnnotations;

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

    [Required(ErrorMessage = "BakeTypeId is required.")]
    public required int BakeTypeId { get; set; }

    [Required(ErrorMessage = "ImageUrl is required.")]
    [StringLength(500, ErrorMessage = "ImageUrl cannot exceed 500 characters.")]
    public required string ImageUrl { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description is required.")]
    [StringLength(200, ErrorMessage = "Description cannot exceed 200 characters.")]
    public required string Description { get; set; } = string.Empty;

    [Range(0, int.MaxValue, ErrorMessage = "Stock exceeded maximum value.")]
    public int Stock { get; set; } = 0;
    
    [Range(0, 100, ErrorMessage = "Discount must be between 0 and 100.")]
    public int Discount { get; set; } = 0;

    public bool InProduction { get; set; } = false;
    
    public BakeType BakeType { get; set; } = new BakeType();
}