using heavenlybakes.api.DTOs;
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

    [HttpPost("/Review")]
    public async Task<IActionResult> PostReview([FromBody] ReviewPostDto reviewPostDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        //Map DTO to Review 
        var review = reviewPostDto.ToReviewFromPostDto();
        
        //Add Review to Repo
        var newReview = await _reviewRepository.AddReviewAsync(review);
        
        
        if (newReview == null)
        {
            return BadRequest("Could not create the review.");
        }

        return Ok(newReview.ToReviewRequestDto());
    }
}