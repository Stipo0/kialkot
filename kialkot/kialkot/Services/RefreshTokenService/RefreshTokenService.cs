using kialkot.Models.Domain;
using kialkot.Repositories.RefreshTokenRepository;
using Microsoft.AspNetCore.Http;

namespace kialkot.Services.RefreshTokenService
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        public RefreshTokenService(
            IRefreshTokenRepository refreshTokenRepository
        )
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<RefreshToken> CreateOrUpdateRefreshTokenAsync(User user)
        {
            var responseToken = new RefreshToken();
            var existingToken = await _refreshTokenRepository.GetRefreshTokenAsync(user);
            if (existingToken != null)
            {
                existingToken.Token = Guid.NewGuid().ToString();
                existingToken.Expires = DateTime.UtcNow.AddDays(7);
                await _refreshTokenRepository.UpdateAsync(existingToken);
                responseToken = existingToken;
            }
            else
            {
                var newToken = new RefreshToken
                {
                    Token = Guid.NewGuid().ToString(),
                    CreatedAt = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddDays(7),
                    User = user,
                    UserId = user.Id
                };
                await _refreshTokenRepository.CreateAsync(newToken);
                responseToken = newToken;

            }
            return responseToken;
        }
    }
}
