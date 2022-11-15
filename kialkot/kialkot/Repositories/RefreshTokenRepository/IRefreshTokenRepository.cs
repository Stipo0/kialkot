using kialkot.Models.Domain;

namespace kialkot.Repositories.RefreshTokenRepository
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetRefreshTokenByUserIdAsync(int userId);
        Task CreateAsync(RefreshToken refreshToken);
        Task UpdateAsync(RefreshToken refreshToken);
        Task<RefreshToken?> GetTokenAsync(string refreshToken);
    }
}
