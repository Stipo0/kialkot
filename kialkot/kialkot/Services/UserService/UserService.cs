using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Repositories.ForgotPasswordRepository;
using kialkot.Repositories.UserRepository;
using System.Security.Cryptography;

namespace kialkot.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IForgotPasswordRepository _forgotPasswordRepository;
        public UserService(IUserRepository userRepository,
            IForgotPasswordRepository forgotPasswordRepository)
        {
            _userRepository = userRepository;
            _forgotPasswordRepository = forgotPasswordRepository;
        }
        
        public async Task RegisterUser(RegisterUserDto request)
        {
            using (var hmac = new HMACSHA512())
            {
                var passwordSalt = hmac.Key;
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.Password));

                var user = new User
                {
                    NickName = request.NickName,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    Role = "user"
                };

                await _userRepository.CreateAsync(user);
            }
        }

        public bool VerifyPassword(string inputPassword, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(inputPassword));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public async Task<bool> CreateOrUpdateForgotTokenAsync(User user)
        {
            var forgotPasswordToken = await _forgotPasswordRepository.GetTokenByUserIdAsync(user.Id);
            if (forgotPasswordToken == null)
            {
                forgotPasswordToken = new ForgotPasswordToken
                {
                    Token = Guid.NewGuid().ToString(),
                    CreatedAt = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    IsValid = true,
                    User = user,
                    UserId = user.Id
                };
                await _forgotPasswordRepository.CreateAsync(forgotPasswordToken);
            }
            else
            {
                forgotPasswordToken.Token = Guid.NewGuid().ToString();
                forgotPasswordToken.CreatedAt = DateTime.UtcNow;
                forgotPasswordToken.Expires = DateTime.UtcNow.AddMinutes(30);
                forgotPasswordToken.IsValid = true;
                await _forgotPasswordRepository.UpdateAsync(forgotPasswordToken);
            }

            //TODO email kiküldése
            return true;
        }
        public async Task<bool> ResetPassword(string token, ResetPasswordDto request)
        {
            if (!await _forgotPasswordRepository.TokenIsValid(token))
            {
                return false;
            }
            var forgotPasswordToken = await _forgotPasswordRepository.GetToken(token);
            if (forgotPasswordToken == null)
            {
                return false;
            }
            var user = await _userRepository.GetByIdAsync(forgotPasswordToken.UserId);
            if (user == null)
            {
                return false;
            }
            using (var hmac = new HMACSHA512())
            {
                var passwordSalt = hmac.Key;
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.NewPassword));

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                await _userRepository.UpdateAsync(user);
            }
            forgotPasswordToken.IsValid = false;
            await _forgotPasswordRepository.UpdateAsync(forgotPasswordToken);

            return true;
        }
    }
}
