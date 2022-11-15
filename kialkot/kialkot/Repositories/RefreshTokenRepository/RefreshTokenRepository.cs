using kialkot.Data;
using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Repositories.RefreshTokenRepository
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly ApplicationDbContext _context;
        public RefreshTokenRepository (ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Update(refreshToken);
            await _context.SaveChangesAsync();
        }

        public Task<RefreshToken?> GetRefreshTokenByUserIdAsync(int userId)
        {
            return _context.RefreshTokens.FirstOrDefaultAsync(x => x.User.Id == userId);
        }
        
        public Task<RefreshToken?> GetTokenAsync(string refreshToken)
        {
            return _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
        }
    }
}