using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class ReviewExtension 
{
    public static ReviewRequestDto ToReviewRequestDto(this Review review)
    {
        return new ReviewRequestDto
        {
            UserId = review.UserId,
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
            UserId = review.UserId,
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
            UserId = reviewPostDto.UserId,
            BakeId = reviewPostDto.BakeId,
            Title = reviewPostDto.Title,
            Feedback = reviewPostDto.Feedback,
            Rating = reviewPostDto.Rating,
            CreateDateTime = reviewPostDto.CreateDateTime,
        };
    }
}