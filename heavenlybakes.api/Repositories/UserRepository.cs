using heavenlybakes.api.Contexts;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public UserRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }

    public async Task<User?> CreateUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }
    
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        return user;
    }

    public async Task<User?> GetUserByIdAsync(Guid userId)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
    
    
    public async Task<bool> ResetPasswordAsync(User user, string hashedPassword)
    {
        //Update password and save changes to DB
        user.Password = hashedPassword;
        await _context.SaveChangesAsync();
        
        return true;
    }
}