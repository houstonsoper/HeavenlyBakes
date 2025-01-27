using heavenlybakes.api.DTOs;
using heavenlybakes.api.Extensions;
using heavenlybakes.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : Controller
{
    private readonly IUserService _userService;
    private readonly IPasswordTokenService _passwordTokenService;

    public UserController(IUserService userService, IPasswordTokenService passwordTokenService)
    {
        _userService = userService;
        _passwordTokenService = passwordTokenService;
    }
    
    [HttpPost ("Register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationDto userDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        //Attempt to create the user
        try
        {
            var user = await _userService.CreateUserAsync(userDto);
            
            if (user != null)
            { 
                //Store session info
                HttpContext.Session.SetString("UserId", user.UserId.ToString()); 
                
                return Ok(new { message = "User created successfully" });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message});
        }
        return BadRequest(new { message = "Unable to create user" });
    }

    [HttpPost ("Login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        //Attempt to log the user in
        try
        {
            var user = await _userService.LoginAsync(userLoginDto);
            
            if (user == null)
            {
                return BadRequest(new { message = "Unable to login" });
            } 
            
            //Store session info
            HttpContext.Session.SetString("UserId", user.UserId.ToString()); 
            
            return Ok(new { message = "Login successful" });
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        //Get userID from the session
        var userId = HttpContext.Session.GetString("UserId");
        
        //Attempt to get the details of the user 
        try
        {
            if (userId == null)
            {
                return Ok(new { message = "User is not logged in" });
            }
            var user = await _userService.GetUserByIdAsync(Guid.Parse(userId)); 
            return Ok(user?.ToUserRequestDto());
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("Logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Remove("UserId");
        return Ok(new { message = "Logout successful" });
    }

    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] UserPasswordResetDto userPasswordResetDto)
    {
        try
        {
            //Get the details of the password token
            var token = await _passwordTokenService.GetTokenByTokenIdAsync(userPasswordResetDto.TokenId);

            //If password token is valid/exists then reset the users password
            if (token != null)
            {
                await _userService.ResetPasswordAsync(token.UserId, token.TokenId, userPasswordResetDto.Password);
                return Ok(new { message = "Password reset successful" });
            }
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        return BadRequest(new { message = "Unable to reset password" });
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserById(string userId)
    {
        if (!Guid.TryParse(userId, out var userGuid))
        {
            return BadRequest(new { message = "Please enter a valid Guid" });
        }
        
        var user = await _userService.GetUserByIdAsync(userGuid);
        
        if (user == null) 
            return BadRequest(new { message = "Unable to find user" });
        
        return Ok(user.ToUserRequestDto());
    }

    [HttpPut("{userId}/Group")]
    public async Task<IActionResult> UpdateUsersGroup([FromRoute] string userId, [FromBody] UserGroupUpdateDto userGroupUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        if (!Guid.TryParse(userId, out var userGuid))
        {
            return BadRequest(new { message = "Please enter a valid Guid" });
        }
        
        //Try to update the users group
        try
        {
            await _userService.UpdateUsersGroupAsync(userGuid, userGroupUpdateDto.GroupId);
            return Ok("User group updated successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}