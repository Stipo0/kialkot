using kialkot.Models.Request;
using kialkot.Repositories.UserRepository;
using kialkot.Services.JwtTokenService;
using kialkot.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace kialkot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase { 
        
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(IUserRepository userRepository,
            IUserService userService,
            IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _userService = userService;
            _jwtTokenService = jwtTokenService;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserDto request)
        {
            var user = await _userRepository.GetByNameAsync(request.Name);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (_userService.VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                var token = _jwtTokenService.CreateTokenAsync(user);
                return Ok(token);
            }
            return Unauthorized();
        }
    }
}
