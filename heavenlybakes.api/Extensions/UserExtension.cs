using heavenlybakes.api.DTOs;
using heavenlybakes.api.Models;

namespace heavenlybakes.api.Extensions;

public static class UserExtension 
{
    public static UserRegistrationDto ToUserRegistrationDto(this User user)
    {
        return new UserRegistrationDto
        {
            Forename = user.Forename,
            Surname = user.Surname,
            Email = user.Email,
            Password = user.Password,
        };
    }

    public static UserRequestDto ToUserRequestDto(this User user)
    {
        return new UserRequestDto
        {
            UserId = user.UserId,
            Forename = user.Forename,
            Surname = user.Surname,
            Email = user.Email,
            UserGroup = user.UserGroup,
        };
    }

    public static UserLoginDto ToUserLoginDto(this User user)
    {
        return new UserLoginDto
        {
            Email = user.Email,
            Password = user.Password
        };
    }
}