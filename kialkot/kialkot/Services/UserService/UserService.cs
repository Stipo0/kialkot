using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.CustomTokenRepository;
using kialkot.Repositories.UserRepository;
using kialkot.Services.SmtpService;
using System.Security.Cryptography;

namespace kialkot.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICustomTokenRepository _CustomTokenRepository;
        private readonly ISmtpService _smtpService;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository userRepository,
            ICustomTokenRepository CustomTokenRepository,
            ISmtpService smtpService,
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _CustomTokenRepository = CustomTokenRepository;
            _smtpService = smtpService;
            _configuration = configuration;
        }
        
        public async Task<bool> RegisterUser(RegisterUserDto request)
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
                    Verified = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                if (request.IsDesinger == "1") { user.Role = Role.Designer; }
                if (request.IsDesinger == "0") { user.Role = Role.User; }
                
                var customToken = new CustomToken
                {
                    Token = Guid.NewGuid().ToString(),
                    TokenType = TokenType.VerificationToken,
                    CreatedAt = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddDays(1),
                    IsValid = true,
                    User = user,
                    UserId = user.Id
                };

                var template = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Templates", "UserVerification.html"));

                template = template.Replace("{0}", user.NickName);
                template = template.Replace("{1}", $"{_configuration["UserVerificationMailContent:Url"]}?token={customToken.Token}");

                if (
                    await _smtpService.SendEmail(
                        user.Email,
                        _configuration.GetValue<string>("UserVerificationMailContent:Subject"),
                        template)
                   )
                {
                    await _userRepository.CreateAsync(user);
                    await _CustomTokenRepository.CreateAsync(customToken);
                    return true;
                };
                return false;
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
            var forgotPasswordToken = await _CustomTokenRepository.GetTokenByUserIdAsync(user.Id, TokenType.ForgotPasswordToken);
            if (forgotPasswordToken == null)
            {
                forgotPasswordToken = new CustomToken
                {
                    Token = Guid.NewGuid().ToString(),
                    TokenType = TokenType.ForgotPasswordToken,
                    CreatedAt = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    IsValid = true,
                    User = user,
                    UserId = user.Id
                };
                await _CustomTokenRepository.CreateAsync(forgotPasswordToken);
            }
            else
            {
                forgotPasswordToken.Token = Guid.NewGuid().ToString();
                forgotPasswordToken.CreatedAt = DateTime.UtcNow;
                forgotPasswordToken.Expires = DateTime.UtcNow.AddMinutes(30);
                forgotPasswordToken.IsValid = true;
                await _CustomTokenRepository.UpdateAsync(forgotPasswordToken);
            }
            
            var template = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Templates", "ForgotPasswordEmail.html"));
            
            template = template.Replace("{0}", user.NickName);
            template = template.Replace("{1}", $"{_configuration["ForgotPasswordMailContent:Url"]}?token={forgotPasswordToken.Token}");
            
            return (
                await _smtpService.SendEmail(
                    user.Email,
                    _configuration.GetValue<string>("ForgotPasswordMailContent:Subject"),
                    template
                ));
        }
        public async Task<bool> ResetPassword(string token, ResetPasswordDto request)
        {
            if (!await _CustomTokenRepository.TokenIsValid(token,TokenType.ForgotPasswordToken))
            {
                return false;
            }
            var forgotPasswordToken = await _CustomTokenRepository.GetToken(token,TokenType.ForgotPasswordToken);
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
            await _CustomTokenRepository.UpdateAsync(forgotPasswordToken);

            return true;
        }

        public async Task<bool> UpdateUser(User user, UpdateUserDto request)
        {
            if (!VerifyPassword(request.CurrentPassword,user.PasswordHash,user.PasswordSalt)) { return false; }
            user.NickName = request.NickName;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;

            if (request.NewPassword != string.Empty)
            {
                if (!VerifyPassword(request.NewPassword, user.PasswordHash, user.PasswordSalt))
                {
                    using (var hmac = new HMACSHA512())
                    {
                        var passwordSalt = hmac.Key;
                        var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.NewPassword));

                        user.PasswordHash = passwordHash;
                        user.PasswordSalt = passwordSalt;
                    }
                }
            }
            user.UpdatedAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<List<MinUserForAdminDto>> GetUsersForAdminAsync(UsersByRole role, int id)
        {
            List<User> users;
            if (role == UsersByRole.UserAndDesigner)
            {
                users = await _userRepository.GetUsers(id);
            }
            else { users = await _userRepository.GetUsersByRole(role,id); }
            
            var usersForAdmin = new List<MinUserForAdminDto>();
            foreach (var user in users)
            {
                usersForAdmin.Add(new MinUserForAdminDto
                {
                    Id = user.Id,
                    NickName = user.NickName,
                    Email = user.Email,
                });
            }
            return usersForAdmin;
        }
        public async Task<UserForAdminDto> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return new UserForAdminDto
            {
                Id = user!.Id,
                NickName = user.NickName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
}
