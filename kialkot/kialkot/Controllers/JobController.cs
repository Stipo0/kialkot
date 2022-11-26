using kialkot.Enums;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.UserRepository;
using kialkot.Services.HttpAccesorService;
using kialkot.Services.JobService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace kialkot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobController : Controller
    {
        private readonly IJobService _jobService;
        private readonly IHttpAccessorService _httpAccessorService;
        private readonly IUserRepository _userRepository;

        public JobController(IJobService jobService,
            IHttpAccessorService httpAccessorService,
            IUserRepository userRepository)
        {
            _jobService = jobService;
            _httpAccessorService = httpAccessorService;
            _userRepository = userRepository;
        }

        [HttpPost]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult> CreateJob([FromBody] CreateJobDto request)
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }

            await _jobService.CreateJobAsync(user, request);
            return Ok(new OkDto
            {
                Ok = "Job created"
            });
        }

        [HttpGet("jobs/{status}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> GetJobsByStatus([FromQuery] JobStatusEnum status)
        {
            return Ok(await _jobService.GetJobByStatus(status));
        }
    }
}
