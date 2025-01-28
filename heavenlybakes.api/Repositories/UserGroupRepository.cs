using heavenlybakes.api.Contexts;
using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;

namespace heavenlybakes.api.Repositories;

public class UserGroupRepository : IUserGroupRepository
{
    private readonly HeavenlyBakesDbContext _context;

    public UserGroupRepository(HeavenlyBakesDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<UserGroup>> GetAllUserGroups()
    {
        return await _context.UserGroups.ToListAsync();
    }
}