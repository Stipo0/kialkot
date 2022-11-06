using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Repositories.ForgotPasswordRepository;
using kialkot.Repositories.UserRepository;
using kialkot.Services.SmtpService;
using System.Security.Cryptography;

namespace kialkot.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IForgotPasswordRepository _forgotPasswordRepository;
        private readonly ISmtpService _smtpService;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository userRepository,
            IForgotPasswordRepository forgotPasswordRepository,
            ISmtpService smtpService,
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _forgotPasswordRepository = forgotPasswordRepository;
            _smtpService = smtpService;
            _configuration = configuration;
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

            var url = $"{_configuration["ForgotPasswordMailContent:Url"]}?token={forgotPasswordToken.Token}";
            return (
                await _smtpService.SendEmail(
                    user.Email,
                    _configuration.GetValue<string>("ForgotPasswordMailContent:Subject"),
                    $"{_configuration.GetValue<string>("ForgotPasswordMailContent:Body")}"
                    .Replace("{0}", user.NickName)
                    .Replace("{1}", url)
                ));
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
