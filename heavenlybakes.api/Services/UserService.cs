using heavenlybakes.api.DTOs;
using heavenlybakes.api.Exceptions;
using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IEmailSender _emailSender;
    private readonly IPasswordTokenRepository _passwordTokenRepository;

    public UserService(IUserRepository userRepository, IEmailSender emailSender, IPasswordTokenRepository passwordTokenRepository)
    {
        _userRepository = userRepository;
        _emailSender = emailSender;
        _passwordTokenRepository = passwordTokenRepository;
    }

    public async Task<User?> CreateUserAsync(UserRegistrationDto userDto)
    {
        //Check if a user with the email already exists
        if (await _userRepository.GetUserByEmailAsync(userDto.Email) != null)
        {
            throw new Exception("A user with that email already exists");
        }
        
        //Hash the users password 
        var passwordHasher = new PasswordHasher<UserRegistrationDto>();
        var hashedPassword = passwordHasher.HashPassword(userDto, userDto.Password);
        
        // Create and save the user
        var user = new User
        {
            Forename = userDto.Forename,
            Surname = userDto.Surname,
            Email = userDto.Email,
            Password = hashedPassword,
        };
        
        var newUser =  await _userRepository.CreateUserAsync(user) 
                       ?? throw new Exception("Failed to create user");
        
        //Send email to user that they have been registered on a seperate thread
        _ = Task.Run(() => _emailSender.SendRegistrationEmail(userDto.Email));
        
        return newUser;
    }

    public async Task<User?> LoginAsync(UserLoginDto userDto)
    {
        //Check if the user exists 
        var user = await _userRepository.GetUserByEmailAsync(userDto.Email) 
                   ?? throw new Exception("Invalid username or password");
        
        //Check that their password is correct
        var passwordHasher = new PasswordHasher<User>();
        var result = passwordHasher.VerifyHashedPassword(user, user.Password, userDto.Password);

        if (result == PasswordVerificationResult.Failed)
        {
            throw new InvalidUserCredentialsException("Invalid username or password");
        }

        return user;
    }

    public async Task<User?> GetUserByIdAsync(Guid userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId) 
                   ?? throw new Exception("User not found");
        
        return user;
    }
    
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var user = await _userRepository.GetUserByEmailAsync(email) 
                   ?? throw new Exception("User not found");
        
        return user;
    }

    public async Task UpdateUsersGroupAsync(Guid userId, int groupId)
    {
        //Get the user
        var user = await _userRepository.GetUserByIdAsync(userId)
            ?? throw new Exception("User not found");
        
        //Get the usergroup
        var userGroup = await _userRepository.GetUserGroupById(groupId)
            ?? throw new Exception("Group not found");
        
        //Update the users group
        await _userRepository.UpdateUsersGroupAsync(user, userGroup.GroupId);
    }

    public async Task<IEnumerable<User>> GetUsersAsync(int? limit, int? offset, string? search)
    {
        var query = _userRepository.GetAllUsersQuery();

        //Apply search
        if (!string.IsNullOrEmpty(search))
        {
            query = query
                .Where(u => 
                    u.Email.ToLower().Contains(search.ToLower()) || 
                    u.Forename.ToLower().Contains(search.ToLower()) || 
                    u.Surname.ToLower().Contains(search.ToLower())
                    );
        }
        //Apply offset
        if (offset.HasValue)
        {
            query = query.Skip(offset.Value);
        }

        //Apply limit
        if (limit.HasValue)
        {
            query = query.Take(limit.Value);
        }

        return await query.ToListAsync();
    }

    public async Task ResetPasswordAsync(Guid userId, Guid tokenId, string newPassword)
    {
        //Get user
        var user = await _userRepository.GetUserByIdAsync(userId)
            ?? throw new Exception("User not found");

        if (newPassword.Length < 5 || newPassword.Length > 15)
        {
            throw new InvalidUserCredentialsException("Password must be between 5 and 15 characters");
        }
        
        //Hash password
        var passwordHasher = new PasswordHasher<User>();
        var hashedPassword = passwordHasher.HashPassword(user, newPassword);
        
        var resetPassword = await _userRepository.ResetPasswordAsync(user, hashedPassword);

        if (!resetPassword)
            throw new Exception("Failed to reset password");
        
        //Set token as used
        await _passwordTokenRepository.UpdateUsedTokenAsync(tokenId);
    }
    
}