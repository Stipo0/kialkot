using kialkot.Models.Request;
using kialkot.Models.Response;
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
        public AccountController(
            IUserRepository userRepository,
            IUserService userService,
            IHttpAccessorService httpAccessorService)
        {
            _userRepository = userRepository;
            _userService = userService;
            _httpAccessorService = httpAccessorService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> Register([FromBody] RegisterUserDto request)
        {
            if (await _userRepository.CheckExistName(request.Name))
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
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }
    }
}
