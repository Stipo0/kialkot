using kialkot.Enums;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.CustomTokenRepository;
using kialkot.Repositories.UserRepository;
using kialkot.Services.HttpAccesorService;
using kialkot.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace kialkot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IHttpAccessorService _httpAccessorService;
        private readonly ICustomTokenRepository _customTokenRepository;
        public AccountController(
            IUserRepository userRepository,
            IUserService userService,
            IHttpAccessorService httpAccessorService,
            ICustomTokenRepository customTokenRepository)
        {
            _userRepository = userRepository;
            _userService = userService;
            _httpAccessorService = httpAccessorService;
            _customTokenRepository = customTokenRepository;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> Register([FromBody] RegisterUserDto request)
        {
            if (await _userRepository.CheckExistName(request.NickName))
            {
                return BadRequest(new ErrorDto { Error = "Username already exists" });
            }
            if (await _userRepository.CheckExistEmail(request.Email))
            {
                return BadRequest(new ErrorDto { Error = "Email already exists" });
            }
            if (await _userService.RegisterUser(request))
                {
                return Ok(new OkDto
                {
                    Ok = "Registration successful"
                });
            }
            return BadRequest(new ErrorDto { Error = "Registration failed" });
        }

        [AllowAnonymous]
        [HttpPost("forgotpassword")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordDto request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }
            if (!user.Verified)
            {
                return BadRequest(new ErrorDto { Error = "User not verified" });
            }
            {
                return BadRequest(new ErrorDto { Error = "You can't change password from the same IP" });
            }
            if (await _userService.CreateOrUpdateForgotTokenAsync(user))
            {
                return Ok(new OkDto
                {
                    Ok = "Email sent"
                });
            }
            return BadRequest(new ErrorDto
            {
                Error = "Email not sent"
            });
        }

        [AllowAnonymous]
        [HttpGet("forgotpasswordtokenverification")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> ForgotPasswordTokenVerification([FromQuery] string token)
        {
            return Ok(new IsValidDto
            {
                IsValid = await _customTokenRepository.TokenIsValid(token, TokenType.ForgotPasswordToken)
            });
        }

        [AllowAnonymous]
        [HttpPost("verifyaccount")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> VerifyAccount(string token)
        {
            if (await _customTokenRepository.TokenIsValid(token, TokenType.VerificationToken))
            {
                var tokenEntity = await _customTokenRepository.GetToken(token, TokenType.VerificationToken);
                if (tokenEntity != null)
                {
                    var user = await _userRepository.GetByIdAsync(tokenEntity.UserId);
                    if (user != null)
                    {
                        user.Verified = true;
                        await _userRepository.UpdateAsync(user);
                        tokenEntity.IsValid = false;
                        await _customTokenRepository.UpdateAsync(tokenEntity);
                        return Ok(new OkDto
                        {
                            Ok = "Account verified"
                        });
                    }
                }
            }
            return BadRequest(new ErrorDto
            {
                Error = "Invalid token"
            });
        }

        [AllowAnonymous]
        [HttpPost("resetpassword")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> ResetPassword([FromQuery] string token, [FromBody] ResetPasswordDto request)
        {
            if (await _userService.ResetPassword(token, request))
            {
                return Ok(new OkDto
                {
                    Ok = "Password reset successful"
                });
            }
            return BadRequest(new ErrorDto
            {
                Error = "Password reset failed"
            });
        }

        [HttpGet("me")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult<UserMeDto>> Me()
        {
            if (_httpAccessorService.IsVerified())
            {
                var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());

                if (user == null)
                {
                    return NotFound(new ErrorDto { Error = "User not found" });
                }

                return Ok(new UserMeDto
                {
                    NickName = user.NickName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Verified = user.Verified,
                    Role = user.Role.ToString(),
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                });
            }
            return BadRequest(new ErrorDto { Error = "User not verified" });
        }

        [HttpPut("update")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult> Update([FromBody] UpdateUserDto request)
        {
            if (_httpAccessorService.IsVerified())
            {
                var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());

                if (user == null)
                {
                    return NotFound(new ErrorDto { Error = "User not found" });
                }
                if (request.NickName != user.NickName && await _userRepository.CheckExistName(request.NickName))
                {
                    return BadRequest(new ErrorDto { Error = "Username already exists" });
                }
                if (request.Email != user.Email && await _userRepository.CheckExistEmail(request.Email))
                {
                    return BadRequest(new ErrorDto { Error = "Email already exists" });
                }
                if (await _userService.UpdateUser(user, request))
                {
                    return Ok(new OkDto
                    {
                        Ok = "Update successful"
                    });
                }
                return BadRequest(new ErrorDto { Error = "Update failed" });

            }
            return BadRequest(new ErrorDto { Error = "User not verified" });
        }
    }
}
