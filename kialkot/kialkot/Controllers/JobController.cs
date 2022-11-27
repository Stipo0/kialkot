using kialkot.Enums;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.JobRepository;
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
        private readonly IJobRepository _jobRepository;
        private readonly IHttpAccessorService _httpAccessorService;
        private readonly IUserRepository _userRepository;

        public JobController(IJobService jobService,
            IHttpAccessorService httpAccessorService,
            IUserRepository userRepository,
            IJobRepository jobRepository)
        {
            _jobService = jobService;
            _httpAccessorService = httpAccessorService;
            _userRepository = userRepository;
            _jobRepository = jobRepository;
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

        [HttpPut("{id}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult> UpdateJob(int id, [FromBody] UpdateJobDto request)
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }

            var job = await _jobRepository.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound(new ErrorDto { Error = "Job not found" });
            }

            if (job.CreatorId != user.Id)
            {
                return BadRequest(new ErrorDto { Error = "You are not the creator of this job" });
            }

            await _jobService.UpdateJobAsync(job, request);
            return Ok(await _jobService.GetJobById(id));
        }

        [HttpDelete("{id}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]
        public async Task<ActionResult> DeleteJob(int id)
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }

            var job = await _jobRepository.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound(new ErrorDto { Error = "Job not found" });
            }

            if (job.CreatorId != user.Id)
            {
                return BadRequest(new ErrorDto { Error = "You are not the creator of this job" });
            }

            await _jobService.DeleteJobAsync(job);
            return Ok(new OkDto
            {
                Ok = "Job deleted"
            });
        }

        [HttpGet("jobs/{status}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> GetJobsByStatus(JobStatusEnum status)
        {
            return Ok(await _jobService.GetJobByStatus(status));
        }
        
        [HttpGet ("{id}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        [SwaggerResponse(404)]

        public async Task<ActionResult> GetJobById(int id)
        {
            if (!await _jobRepository.JobExistsAsync(id))
            {
                return NotFound(new ErrorDto { Error = "Job not found" });
            }
            
            return Ok(await _jobService.GetJobById(id));
        }
    }
}
