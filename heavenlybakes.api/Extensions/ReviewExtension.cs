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
            BakeId = review.BakeId,
            Title = review.Title,
            Feedback = review.Feedback,
            Rating = review.Rating,
            CreateDateTime = review.CreateDateTime,
        };
    }

    public static ReviewPostDto ToReviewPostDto(this Review review)
    {
        return new ReviewPostDto
        {
            CustomerId = review.CustomerId,
            BakeId = review.BakeId,
            Title = review.Title,
            Feedback = review.Feedback,
            Rating = review.Rating,
            CreateDateTime = review.CreateDateTime,
        };
    }

    public static Review ToReviewFromPostDto(this ReviewPostDto reviewPostDto)
    {
        return new Review
        {
            CustomerId = reviewPostDto.CustomerId,
            BakeId = reviewPostDto.BakeId,
            Title = reviewPostDto.Title,
            Feedback = reviewPostDto.Feedback,
            Rating = reviewPostDto.Rating,
            CreateDateTime = reviewPostDto.CreateDateTime,
        };
    }
}