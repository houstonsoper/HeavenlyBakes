using heavenlybakes.api.Context;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public PaymentRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }
        
    public async Task<IEnumerable<PaymentMethod>> GetPaymentMethods()
    {
        return await _context.PaymentMethods.ToListAsync();
    }
}