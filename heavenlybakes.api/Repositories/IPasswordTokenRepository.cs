using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IPasswordTokenRepository
{
    Task AddTokenAsync(PasswordResetToken passwordResetToken);
    Task<PasswordResetToken?> GetActiveTokenByUserIdAsync(Guid userId);
    Task<PasswordResetToken?> GetTokenByTokenIdAsync(Guid tokenId);
    Task UpdateUsedTokenAsync (Guid tokenId);
}