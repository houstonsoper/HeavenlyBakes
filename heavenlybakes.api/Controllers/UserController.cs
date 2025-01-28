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

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationDto userDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        //Try to create the user
        var user = await _userService.CreateUserAsync(userDto);

        if (user == null)
        {
            return BadRequest(new { message = "Unable to create user" });
        }

        //Store session info
        HttpContext.Session.SetString("UserId", user.UserId.ToString());

        return Ok(new { message = "User created successfully" });
    }
    
    [HttpDelete("{userId}/Delete")]
    public async Task<IActionResult> DeleteUser([FromRoute] string userId)
    {
        //Try to parse the userId into a Guid
        if (!Guid.TryParse(userId, out Guid userGuid))
        {
            return BadRequest("Please enter a valid Guid");
        }
        
        //Delete the user
        await _userService.DeleteUserAsync(userGuid);
        
        return Ok(new { message = "User deleted successfully" });
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        //Try to log the user in
        var user = await _userService.LoginAsync(userLoginDto);

        if (user == null)
        {
            return BadRequest(new { message = "Unable to login" });
        }

        //Store session info
        HttpContext.Session.SetString("UserId", user.UserId.ToString());
        return Ok(new { message = "Login successful" });
    }

    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        //Get userID from the session
        var userId = HttpContext.Session.GetString("UserId");

        //If no userID is found then the user is not logged in
        if (userId == null)
            return Ok(new { message = "User is not logged in" });

        //If there is a userId find and return the user
        var user = await _userService.GetUserByIdAsync(Guid.Parse(userId));
        return Ok(user?.ToUserRequestDto());
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
        //Get the details of the password token
        var token = await _passwordTokenService.GetTokenByTokenIdAsync(userPasswordResetDto.TokenId);

        //If password token is valid/exists then reset the users password
        if (token != null)
        {
            await _userService.ResetPasswordAsync(token.UserId, token.TokenId, userPasswordResetDto.Password);
            return Ok(new { message = "Password reset successful" });
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
    public async Task<IActionResult> UpdateUsersGroup([FromRoute] string userId,
        [FromBody] UserGroupUpdateDto userGroupUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!Guid.TryParse(userId, out var userGuid))
        {
            return BadRequest(new { message = "Please enter a valid Guid" });
        }

        //Update the users group
        await _userService.UpdateUsersGroupAsync(userGuid, userGroupUpdateDto.GroupId);

        return Ok(new { message = "User group updated successfully" });
}

    [HttpGet("/Users")]
    public async Task<IActionResult> GetUsers([FromQuery] int? limit, [FromQuery] int? offset, [FromQuery] string? search)
    {
        var users = await _userService.GetUsersAsync(limit, offset, search);
        var usersDto = users.Select(u => u.ToUserRequestDto());
        return Ok(usersDto);
    }
}