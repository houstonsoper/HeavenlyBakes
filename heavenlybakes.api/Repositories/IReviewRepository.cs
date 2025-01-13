using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetReviewsByBake(int bakeId);
    Task<IEnumerable<Review>> GetReviewByCustomerIdAsync(string customerId);
}