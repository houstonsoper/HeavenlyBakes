﻿using heavenlybakes.api.Context;
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

    public async Task<ReviewRequestDto> AddReviewAsync(ReviewPostDto review)
    {
        var newReview = review.ToReviewFromPostDto();
        await _context.Reviews.AddAsync(newReview);
        await _context.SaveChangesAsync();

        return newReview.ToReviewRequestDto();
    }
}