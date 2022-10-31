using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Repositories.UserRepository;
using System.Security.Cryptography;

namespace kialkot.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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
    }
}
