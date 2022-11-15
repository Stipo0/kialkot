using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.ForgotPasswordRepository;
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
        private readonly IForgotPasswordRepository _forgotPasswordRepository;
        public AccountController(
            IUserRepository userRepository,
            IUserService userService,
            IHttpAccessorService httpAccessorService,
            IForgotPasswordRepository forgotPasswordRepository)
        {
            _userRepository = userRepository;
            _userService = userService;
            _httpAccessorService = httpAccessorService;
            _forgotPasswordRepository = forgotPasswordRepository;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> Register([FromBody] RegisterUserDto request)
        {
            if (await _userRepository.CheckExistName(request.NickName))
            {
                return BadRequest("Username already exists");
            }
            if (await _userRepository.CheckExistEmail(request.Email))
            {
                return BadRequest("Email already exists");
            }
            await _userService.RegisterUser(request);

            return Ok("Registration successful");
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
                return NotFound("User not found");
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
                IsValid = await _forgotPasswordRepository.TokenIsValid(token)
            });
        }

        [AllowAnonymous]
        [HttpPost("resetpassword")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> ResetPassword([FromQuery] string token,[FromBody] ResetPasswordDto request)
        {
            if (await _userService.ResetPassword(token, request))
            {
                return Ok(new OkDto
                {
                    Ok = "Password reset successful"
                });
            }
            return BadRequest( new ErrorDto {
                Error = "Password reset failed"
            });
        }

        [HttpGet("me")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult<UserMeDto>> Me()
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserMeDto
            {
                NickName = user.NickName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            });
        }
    }
}
