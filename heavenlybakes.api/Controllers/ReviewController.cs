using heavenlybakes.api.Extensions;
using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("[controller]")]

public class ReviewController : Controller
{
    private readonly IReviewRepository _reviewRepository;

    public ReviewController(IReviewRepository reviewRepository)
    {
        _reviewRepository = reviewRepository;
    }
    
    [HttpGet ("/Reviews")]
    public async Task<IActionResult> GetReviews([FromQuery] int? bakeId, [FromQuery] string? customerId)
    {
        var reviews = await _reviewRepository.GetReviewsAsync(bakeId, customerId);
        
        var reviewsDto = reviews.Select(r => r.ToReviewRequestDto());
        
        return Ok(reviewsDto);
    }

    [HttpGet("/Rating/{bakeId}")]
    public async Task<IActionResult> GetRating(int bakeId)
    {
        var rating = await _reviewRepository.GetRatingAsync(bakeId);
        
        return Ok(rating);
    }
}