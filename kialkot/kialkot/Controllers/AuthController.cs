using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.ForgotPasswordRepository;
using kialkot.Repositories.RefreshTokenRepository;
using kialkot.Repositories.UserRepository;
using kialkot.Services.JwtTokenService;
using kialkot.Services.RefreshTokenService;
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
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthController(IUserRepository userRepository,
            IUserService userService,
            IJwtTokenService jwtTokenService,
            IRefreshTokenService refreshTokenService,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _userRepository = userRepository;
            _userService = userService;
            _jwtTokenService = jwtTokenService;
            _refreshTokenService = refreshTokenService;
            _refreshTokenRepository = refreshTokenRepository;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserDto request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (_userService.VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                var token = _jwtTokenService.CreateTokenAsync(user);

                var refreshToken = await _refreshTokenService.CreateOrUpdateRefreshTokenAsync(user);
                Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
                 {
                     HttpOnly = true,
                    Expires = refreshToken.Expires
                });

                return Ok(new TokenDto
                    {
                        Token = token,
                    }
                );
            }
            return Unauthorized();
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest("No refresh token in cookie");
            }
            var userToken = await _refreshTokenRepository.GetTokenAsync(refreshToken);
            if (userToken == null || userToken.Expires < DateTime.UtcNow)
            {
                return BadRequest("Refresh token is invalid or expired");
            }
            var user = await _userRepository.GetByIdAsync(userToken.Id);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            
            var newRefreshToken = await _refreshTokenService.CreateOrUpdateRefreshTokenAsync(user);
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            });
            
            var token = _jwtTokenService.CreateTokenAsync(user);
            return Ok(new TokenDto
            {
                Token = token,
            });
        }
    }
}
