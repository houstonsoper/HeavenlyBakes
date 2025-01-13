using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetReviews(int? bakeId, string? customerId);
    Task<double> GetRating(int bakeId);
}