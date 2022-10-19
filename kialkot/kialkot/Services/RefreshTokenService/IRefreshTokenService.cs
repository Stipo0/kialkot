using kialkot.Models.Domain;

namespace kialkot.Services.RefreshTokenService
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken> CreateOrUpdateRefreshTokenAsync(User user);
    }
}
