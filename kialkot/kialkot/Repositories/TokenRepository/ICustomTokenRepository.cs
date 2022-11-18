using kialkot.Enums;
using kialkot.Models.Domain;

namespace kialkot.Repositories.CustomTokenRepository
{
    public interface ICustomTokenRepository
    {
        Task<CustomToken?> GetTokenByUserIdAsync(int userId,TokenType type);
        Task CreateAsync(CustomToken token);
        Task UpdateAsync(CustomToken token);
        Task<CustomToken?> GetToken(string token,TokenType type);
        Task<bool> TokenIsValid(string token, TokenType type);
    }
}
