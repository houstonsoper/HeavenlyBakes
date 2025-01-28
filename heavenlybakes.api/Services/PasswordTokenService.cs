using heavenlybakes.api.Exceptions;
using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;

namespace heavenlybakes.api.Services;

public class PasswordTokenService : IPasswordTokenService
{
    private readonly IPasswordTokenRepository _passwordTokenRepository;
    private readonly IEmailSender _emailSender;
    private readonly IUserService _userService;

    public PasswordTokenService(IPasswordTokenRepository passwordTokenRepository, IEmailSender emailSender, IUserService userService)
    {
        _passwordTokenRepository = passwordTokenRepository;
        _emailSender = emailSender;
        _userService = userService;
    }
    
    public async Task<PasswordResetToken?> CreatePasswordResetTokenAsync(string email)
    {
        //Get the details of the user that the password token is for
        var user = await _userService.GetUserByEmailAsync(email);

        if (user == null)
        {
            throw new Exception("User not found");
        }
        
        //Check if there is already an active token for the user
        var existingToken = await _passwordTokenRepository.GetActiveTokenByUserIdAsync(user.UserId);

        //Return existing token if it exists
        if (existingToken != null)
        {
            //Send email to user
            _ = Task.Run(() => _emailSender.SendPasswordResetEmail(user.Email, existingToken.TokenId));
            
            return existingToken;
        } 
        
        //Otherwise create a new token
        var newToken = new PasswordResetToken { UserId = user.UserId };
        
        //Add it to the database
        await _passwordTokenRepository.AddTokenAsync(newToken); 
        
        //Send email to user
        _ = Task.Run(() => _emailSender.SendPasswordResetEmail(user.Email, newToken.TokenId));
        
        return newToken;
    }

    public async Task<PasswordResetToken?> GetTokenByTokenIdAsync(Guid tokenId)
    {
        var token = await _passwordTokenRepository.GetTokenByTokenIdAsync(tokenId);

        //Check if token is not null, hasn't been used, or hasn't expired
        //If one condition is true return an error
        if (token == null || token.TokenUsed || token.ExpiresAt < DateTime.UtcNow)
        {
            throw new InvalidPasswordTokenException("Password reset token does not exist or has expired");
        }
        
        return token;
    }
}