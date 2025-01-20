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

    [HttpPut("/Review/{customerId}/{bakeId}")]
    public async Task<IActionResult> UpdateReview(string customerId, int bakeId, [FromBody] ReviewUpdateDto reviewUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var review = new Review
        {
            CustomerId = customerId,
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

    [HttpDelete("/Review/{customerId}/{bakeId}")]
    public async Task<IActionResult> DeleteReview(string customerId, int bakeId)
    {
        var response = await _reviewRepository.DeleteReviewAsync(customerId, bakeId);

        if (response == null)
        {
            return BadRequest("Could not delete review.");
        }
        
        return Ok(response);
    }
}