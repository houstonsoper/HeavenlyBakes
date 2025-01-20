using heavenlybakes.api.Context;
using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public ReviewRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Review>> GetReviewsAsync(int? bakeId, string? customerId)
    {
        var query = _context.Reviews.AsQueryable();

        if (bakeId != null)
        {
            query = query.Where(r => r.BakeId == bakeId);
        }

        if (customerId != null)
        {
            query = query.Where(r => r.CustomerId == customerId);
        }

        return await query.ToListAsync();
    }

    public async Task<double> GetRatingAsync(int bakeId)
    {
        var averageRating = await _context.Reviews
            .Where(r => r.BakeId == bakeId)
            .AverageAsync(r => r.Rating);

        return Math.Round(averageRating, 2);
    }

    public async Task<Review?> AddReviewAsync(Review review)
    { 
        await _context.Reviews.AddAsync(review); 
        await _context.SaveChangesAsync();
        
        return review;
    }

    public async Task<Review?> UpdateReviewAsync(Review updatedReview)
    {
        //Get the existing review
        var existingReview = await _context.Reviews
            .Where(r => r.CustomerId == updatedReview.CustomerId && r.BakeId == updatedReview.BakeId)
            .FirstOrDefaultAsync();
        
        if (existingReview == null) 
            return null;
        
        //Update the existing review if there are changes made to it
        if (updatedReview.Title != existingReview.Title ||
            updatedReview.Feedback != existingReview.Feedback ||
            updatedReview.Rating != existingReview.Rating)
        {
            existingReview.Title = updatedReview.Title;
            existingReview.Feedback = updatedReview.Feedback;
            existingReview.Rating = updatedReview.Rating;
        }
        await _context.SaveChangesAsync();
        return updatedReview;
    }
}
