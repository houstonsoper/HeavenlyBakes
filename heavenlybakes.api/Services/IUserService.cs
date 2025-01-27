using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Services;

public interface IUserService
{
    public Task<User?> CreateUserAsync(UserRegistrationDto userDto);
    public Task<User?> LoginAsync(UserLoginDto userDto);
    public Task<User?> GetUserByIdAsync(Guid userId);
    public Task ResetPasswordAsync(Guid userId, Guid tokenId, string newPassword);
    public Task<User?> GetUserByEmailAsync(string email);
    public Task UpdateUsersGroupAsync (Guid userId, int groupId);
}