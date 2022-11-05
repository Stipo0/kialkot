using kialkot.Models.Domain;

namespace kialkot.Repositories.ForgotPasswordRepository
{
    public interface IForgotPasswordRepository
    {
        Task<ForgotPasswordToken?> GetTokenByUserIdAsync(int userId);
        Task CreateAsync(ForgotPasswordToken token);
        Task UpdateAsync(ForgotPasswordToken token);
        Task<ForgotPasswordToken?> GetToken(string token);
        Task<bool> TokenIsValid(string token);
    }
}
