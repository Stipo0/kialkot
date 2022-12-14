using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.JobRepository;
using kialkot.Repositories.UserRepository;
using kialkot.Services.ChatRepository;
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
    public class ChatController : Controller
    {
        private readonly IHttpAccessorService _httpAccessorService;
        private readonly IJobService _jobService;
        private readonly IUserRepository _userRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IChatService _chatService;
        public ChatController(IHttpAccessorService httpAccessorService,
            IJobService jobService,
            IUserRepository userRepository,
            IJobRepository jobRepository,
            IChatService chatService)
        {
            _httpAccessorService = httpAccessorService;
            _jobService = jobService;
            _userRepository = userRepository;
            _jobRepository = jobRepository;
            _chatService = chatService;

        }

        [HttpGet("Jobs")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> GetJobs()
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }
            var jobs = await _jobService.Getjobs(user);
            return Ok(jobs);
        }
        
        [HttpGet("{jobId}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> GetChat(int jobId)
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }
            var job = await _jobRepository.GetJobByIdAsync(jobId);
            if (job == null)
            {
                return NotFound(new ErrorDto { Error = "Job not found" });
            }
            if (job.CreatorId != user.Id && job.WorkerId != user.Id)
            {
                return BadRequest(new ErrorDto { Error = "You are not a part of this job" });
            }
            var messages = await _chatService.GetMessages(jobId);
            return Ok(messages);
        }

        [HttpPost("Chat/{jobId}")]
        [SwaggerResponse(200)]
        [SwaggerResponse(400)]
        public async Task<ActionResult> SendMessage(int jobId, [FromBody] SendMessageDto sendMessageDto)
        {
            var user = await _userRepository.GetByIdAsync(_httpAccessorService.GetUserId());
            if (user == null)
            {
                return NotFound(new ErrorDto { Error = "User not found" });
            }
            var job = await _jobRepository.GetJobByIdAsync(jobId);
            if (job == null)
            {
                return NotFound(new ErrorDto { Error = "Job not found" });
            }
            if (job.CreatorId != user.Id && job.WorkerId != user.Id)
            {
                return BadRequest(new ErrorDto { Error = "You are not a part of this job" });
            }
            var message = await _chatService.CreateAsync(user, job, sendMessageDto);
            return Ok(message);
        }
    }
}
