using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetReviewsAsync(int? bakeId, string? customerId);
    Task<double> GetRatingAsync(int bakeId);
    Task<Review?> AddReviewAsync(Review review);
    Task<Review?> UpdateReviewAsync(Review updatedReview);
}