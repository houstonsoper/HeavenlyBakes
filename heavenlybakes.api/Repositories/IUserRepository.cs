using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IUserRepository
{
    Task<User?> CreateUserAsync(User user);
    Task <User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByIdAsync(Guid userId);
    Task<bool> ResetPasswordAsync (User user, string hashedPassword);
}
