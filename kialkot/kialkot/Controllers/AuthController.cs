using kialkot.Enums;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.CustomTokenRepository;
using kialkot.Repositories.UserRepository;
using kialkot.Services.HttpAccesorService;
using kialkot.Services.JwtTokenService;
using kialkot.Services.RefreshTokenService;
using kialkot.Services.UserService;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ICustomTokenRepository _customTokenRepository;

        public AuthController(IUserRepository userRepository,
            IUserService userService,
            IJwtTokenService jwtTokenService,
            IRefreshTokenService refreshTokenService,
            ICustomTokenRepository customTokenRepository)
        {
            _userRepository = userRepository;
            _userService = userService;
            _jwtTokenService = jwtTokenService;
            _refreshTokenService = refreshTokenService;
            _customTokenRepository = customTokenRepository;
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserDto request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest(new ErrorDto { Error = "User not found" });
            }
            if (_userService.VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                if (!user.Verified)
                {
                    return BadRequest(new ErrorDto { Error = "User not verified" });
                }
                
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
            return Unauthorized(new ErrorDto { Error = "Invalid email or password" });
        }
        
        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest(new ErrorDto { Error = "No refresh token in cookie" });
            }
            var userToken = await _customTokenRepository.GetToken(refreshToken, TokenType.RefreshToken);
            if (userToken == null || userToken.Expires < DateTime.UtcNow)
            {
                return BadRequest(new ErrorDto { Error = "Refresh token is invalid or expired" });
            }
            var user = await _userRepository.GetByIdAsync(userToken.Id);
            if (user == null)
            {
                return BadRequest(new ErrorDto { Error = "User not found" });
            }
            
            if (!user.Verified)
            {
                return BadRequest(new ErrorDto { Error = "User not verified" });
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
