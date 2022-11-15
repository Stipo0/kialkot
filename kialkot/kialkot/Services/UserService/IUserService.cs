using kialkot.Models.Domain;
using kialkot.Models.Request;

namespace kialkot.Services.UserService
{
    public interface IUserService
    {
        Task RegisterUser(RegisterUserDto request);
        bool VerifyPassword(string inputPassword, byte[] passwordHash, byte[] passwordSalt);
        Task<bool> ResetPassword(string token, ResetPasswordDto request);
        Task<bool> CreateOrUpdateForgotTokenAsync(User user);
    }
}
