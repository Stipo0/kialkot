using kialkot.Data;
using kialkot.Enums;
using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Repositories.CustomTokenRepository
{
    public class CustomTokenRepository : ICustomTokenRepository
    {
        private readonly ApplicationDbContext _context;
        public CustomTokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(CustomToken token)
        {
            await _context.CustomTokens.AddAsync(token);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(CustomToken token)
        {
            _context.CustomTokens.Update(token);
            await _context.SaveChangesAsync();
        }

        public Task<CustomToken?> GetTokenByUserIdAsync(int userId, TokenType type)
        {
            return _context.CustomTokens.FirstOrDefaultAsync(x => x.User.Id == userId && x.TokenType == type);
        }

        public Task<CustomToken?> GetToken(string forgotToken, TokenType type)
        {
            return _context.CustomTokens.FirstOrDefaultAsync(x => x.Token == forgotToken && x.TokenType == type);
        }

        public Task<bool> TokenIsValid(string forgotToken, TokenType type)
        {
            return _context.CustomTokens.AnyAsync(x => x.Token == forgotToken && x.Expires > DateTime.UtcNow && x.IsValid && x.TokenType == type);
        }
    }
}