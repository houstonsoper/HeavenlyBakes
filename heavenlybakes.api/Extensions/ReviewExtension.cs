using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class ReviewExtension 
{
    public static ReviewRequestDto ToReviewRequestDto(this Review review)
    {
        return new ReviewRequestDto
        {
            Id = review.Id,
            CustomerId = review.CustomerId,
            Title = review.Title,
            Feedback = review.Feedback,
            Rating = review.Rating,
            CreateDateTime = review.CreateDateTime,
            Bake = review.Bake?.ToBakeRequestDto()
        };
    }
}