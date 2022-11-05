using kialkot.Data;
using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Repositories.ForgotPasswordRepository
{
    public class ForgotPasswordRepository : IForgotPasswordRepository
    {
        private readonly ApplicationDbContext _context;
        public ForgotPasswordRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(ForgotPasswordToken token)
        {
            await _context.ForgotPasswordTokens.AddAsync(token);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(ForgotPasswordToken token)
        {
            _context.ForgotPasswordTokens.Update(token);
            await _context.SaveChangesAsync();
        }

        public Task<ForgotPasswordToken?> GetTokenByUserIdAsync(int userId)
        {
            return _context.ForgotPasswordTokens.FirstOrDefaultAsync(x => x.User.Id == userId);
        }
        
        public Task<ForgotPasswordToken?> GetToken(string forgotToken)
        {
            return _context.ForgotPasswordTokens.FirstOrDefaultAsync(x => x.Token == forgotToken);
        }

        public Task<bool> TokenIsValid(string forgotToken)
        {
            return _context.ForgotPasswordTokens.AnyAsync(x => x.Token == forgotToken && x.Expires > DateTime.UtcNow && x.IsValid);
        }
    }
}