using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Models;
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
    public async Task<IActionResult> GetReviews([FromQuery] int? bakeId, [FromQuery] string? userId)
    {
        var reviews = await _reviewRepository.GetReviewsAsync(bakeId, userId);
        
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
        
        //Add Review
        try
        {
            var newReview = await _reviewRepository.AddReviewAsync(review);

            if (newReview == null)
            {
                return BadRequest("Could not add review.");
            }
            
            return Ok(newReview.ToReviewRequestDto());
        }
        catch (InvalidDataException ex)
        {
            return StatusCode(500, new
            { 
                message = ex.Message,
                details = ex.InnerException?.Message ?? "No inner exception thrown.",
                stackTrace = ex.StackTrace ?? "No stack trace avaliable."
            });
        }
    }

    [HttpPut("/Review/{userId}/{bakeId}")]
    public async Task<IActionResult> UpdateReview(string userId, int bakeId, [FromBody] ReviewUpdateDto reviewUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var review = new Review
        {
            UserId = Guid.Parse(userId),
            BakeId = bakeId,
            Title = reviewUpdateDto.Title,
            Feedback = reviewUpdateDto.Feedback,
            Rating = reviewUpdateDto.Rating,
        };
        
        var updatedReview = await _reviewRepository.UpdateReviewAsync(review);

        if (updatedReview == null)
        {
            return BadRequest("Could not update review.");
        }
        
        return Ok(updatedReview.ToReviewRequestDto());
    }

    [HttpDelete("/Review/{userId}/{bakeId}")]
    public async Task<IActionResult> DeleteReview(string userId, int bakeId)
    {
        var isDeleted = await _reviewRepository.DeleteReviewAsync(userId, bakeId);

        if (!isDeleted)
        {
            return NotFound(new { message = $"No review found for bakeId: {bakeId} and userId: {userId}." });
        }
        
        return Ok(new { message = $"Review for bakeId: {bakeId} and userId: {userId} has been deleted." });
    }
}