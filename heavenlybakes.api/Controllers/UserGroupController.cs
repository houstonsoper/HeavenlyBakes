using heavenlybakes.api.Models;
using heavenlybakes.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace heavenlybakes.api.Controllers;

[ApiController]
[Route("[controller]")]

public class UserGroupController : Controller
{
    private readonly IUserGroupRepository _userGroupRepository;

    public UserGroupController(IUserGroupRepository userGroupRepository)
    {
        _userGroupRepository = userGroupRepository;
    }

    [HttpGet("/UserGroups")]
    public async Task<IActionResult> GetAllUserGroups()
    {
        var userGroups = await _userGroupRepository.GetAllUserGroups();
        return Ok(userGroups);
    }
}