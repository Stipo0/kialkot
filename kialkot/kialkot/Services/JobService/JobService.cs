using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.JobRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace kialkot.Services.JobService
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }
        

        public async Task CreateJobAsync(User user,CreateJobDto createJobDto)
        {
            var job = new Job
            {
                CreatorId = user.Id,
                Name = createJobDto.Name,
                Image = createJobDto.Image,
                JobType = createJobDto.JobType,
                EndDate = createJobDto.Deadline,
                Description = createJobDto.Description,
                Status = JobStatusEnum.Open,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Creator = user,
            };
            await _jobRepository.CreateAsync(job);
        }
        public async Task<List<MinJobDto>> GetJobByStatus(JobStatusEnum status)
        {
            var jobs = await _jobRepository.GetJobsByStatusAsync(status);
            List<MinJobDto> minJobs = new List<MinJobDto>();
            foreach (var job in jobs)
            {
                minJobs.Add(new MinJobDto
                {
                    Id = job.Id,
                    Name = job.Name,
                    Creator = new MinUserDto
                    {
                        Id = job.Creator.Id,
                        NickName = job.Creator.NickName,
                        FirstName = job.Creator.FirstName,
                        LastName = job.Creator.LastName,
                        Email = job.Creator.Email,
                    },
                    Image = job.Image,
                    JobType = job.JobType,
                    Deadline = job.EndDate,
                    JobStatus = job.Status.ToString()
                });
            }
            return minJobs;
        }
        
        public async Task<JobDto> GetJobById(int id)
        {
            var job = await _jobRepository.GetJobByIdAsync(id);
            var result =  new JobDto
            {
                Id = job!.Id,
                Name = job.Name,
                Creator = new MinUserDto
                {
                    Id = job.Creator.Id,
                    NickName = job.Creator.NickName,
                    FirstName = job.Creator.FirstName,
                    LastName = job.Creator.LastName,
                    Email = job.Creator.Email,
                },
                Image = job.Image,
                JobType = job.JobType,
                CreatedAt = job.CreatedAt,
                Deadline = job.EndDate,
                JobStatus = job.Status.ToString(),
                Description = job.Description,
            };
            if (job.Worker != null)
            {
                result.Worker = new MinUserDto
                {
                    Id = job.Worker.Id,
                    NickName = job.Worker.NickName,
                    FirstName = job.Worker.FirstName,
                    LastName = job.Worker.LastName,
                    Email = job.Worker.Email,
                };
            }
            return result;
        }
    }
}
