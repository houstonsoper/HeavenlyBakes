using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IUserGroupRepository
{
    Task<IEnumerable<UserGroup>> GetAllUserGroups();
}