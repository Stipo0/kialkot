using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Repositories.CustomTokenRepository;

namespace kialkot.Services.RefreshTokenService
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly ICustomTokenRepository _customTokenRepository;
        public RefreshTokenService(
            ICustomTokenRepository customTokenRepository
        )
        {
            _customTokenRepository = customTokenRepository;
        }

        public async Task<CustomToken> CreateOrUpdateRefreshTokenAsync(User user)
        {
            var existingToken = await _customTokenRepository.GetTokenByUserIdAsync(user.Id, TokenType.RefreshToken);
            if (existingToken != null)
            {
                existingToken.Token = Guid.NewGuid().ToString();
                existingToken.Expires = DateTime.UtcNow.AddDays(7);
                await _customTokenRepository.UpdateAsync(existingToken);
                return existingToken;
            }
            else
            {
                var newToken = new CustomToken
                {
                    Token = Guid.NewGuid().ToString(),
                    TokenType = TokenType.RefreshToken,
                    CreatedAt = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddDays(7),
                    User = user,
                    UserId = user.Id
                };
                await _customTokenRepository.CreateAsync(newToken);
                return newToken;

            }
        }
    }
}
