using kialkot.Models.Domain;

namespace kialkot.Services.RefreshTokenService
{
    public interface IRefreshTokenService
    {
        Task<CustomToken> CreateOrUpdateRefreshTokenAsync(User user);
    }
}
