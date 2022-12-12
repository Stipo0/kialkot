using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;

namespace kialkot.Services.UserService
{
    public interface IUserService
    {
        Task<bool> RegisterUser(RegisterUserDto request);
        bool VerifyPassword(string inputPassword, byte[] passwordHash, byte[] passwordSalt);
        Task<bool> ResetPassword(string token, ResetPasswordDto request);
        Task<bool> CreateOrUpdateForgotTokenAsync(User user);
        Task<bool> UpdateUser(User user, UpdateUserDto request);
        Task<List<MinUserForAdminDto>> GetUsersForAdminAsync(UsersByRole role, int id);
        Task<UserForAdminDto> GetUserByIdAsync(int id);
    }
}
