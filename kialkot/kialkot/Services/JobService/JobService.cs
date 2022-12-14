using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.ChatRepository;
using kialkot.Repositories.JobRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace kialkot.Services.JobService
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _jobRepository;
        private readonly IChatRepository _chatRepository;

        public JobService(IJobRepository jobRepository,
            IChatRepository chatRepository)
        {
            _jobRepository = jobRepository;
            _chatRepository = chatRepository;
        }

        public async Task<JobDto> CreateJobAsync(User user, CreateJobDto createJobDto)
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
            job = await _jobRepository.CreateAsync(job);
            var result = new JobDto
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
                JobStatus = job.Status,
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

        public async Task UpdateJobAsync(Job job, UpdateJobDto updateJobDto)
        {
            job.Name = updateJobDto.Name;
            job.Image = updateJobDto.Image;
            job.JobType = updateJobDto.JobType;
            job.EndDate = updateJobDto.Deadline;
            job.Description = updateJobDto.Description;
            job.UpdatedAt = DateTime.UtcNow;
            await _jobRepository.UpdateAsync(job);
        }

        public async Task DeleteJobAsync(Job job)
        {
            await _jobRepository.DeleteAsync(job);
        }

        public async Task<List<MinJobDto>> GetJobByStatus(JobStatusEnum status, User user)
        {
            var jobs = new List<Job>();
            if (user.Role == Role.User)
                jobs = await _jobRepository.GetJobsByStatusAndCreatorIdAsync(status, user.Id);

            if (user.Role == Role.Desinger)
                jobs = await _jobRepository.GetJobsByStatusAndWorkerIdAsync(status, user.Id);

            if (user.Role == Role.Admin)
                jobs = await _jobRepository.GetJobsByStatusAsync(status);

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
            var result = new JobDto
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
                JobStatus = job.Status,
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

        public async Task<List<MinJobDto>> GetJobsByAnonym()
        {
            var jobs = await _jobRepository.GetJobsByAnonym();
            List<MinJobDto> minJobs = new List<MinJobDto>();
            foreach (var job in jobs)
            {
                minJobs.Add(new MinJobDto
                {
                    Id = job.Id,
                    Name = job.Name,
                    Creator = null!,
                    Image = job.Image,
                    JobType = job.JobType,
                    Deadline = job.EndDate,
                    JobStatus = job.Status.ToString()
                }) ;
            }
            return minJobs;
        }

        public async Task DesingerAcceptJob(Job job, User user)
        {
            job.WorkerId = user.Id;
            job.Worker = user;
            job.Status = JobStatusEnum.Waiting;
            job.UpdatedAt = DateTime.UtcNow;
            await _jobRepository.UpdateAsync(job);
        }

        public async Task DesingerUpdateJobStatus(Job job, JobStatusChange request)
        {
            job.Image = request.Image;
            job.Status = (JobStatusEnum)request.Status;
            job.UpdatedAt = DateTime.UtcNow;
            await _jobRepository.UpdateAsync(job);
        }

        public async Task DesingerCancelJob(Job job)
        {
            job.WorkerId = null;
            job.Worker = null;
            job.Status = JobStatusEnum.Open;
            job.UpdatedAt = DateTime.UtcNow;
            await _jobRepository.UpdateAsync(job);
        }

        public async Task<List<ChatJobDto>> Getjobs(User user)
        {
            var jobs = await _jobRepository.GetJobsByCreatorIdAsync(user.Id);
            List<ChatJobDto> chatJobs = new List<ChatJobDto>();
            foreach (var job in jobs)
            {
                chatJobs.Add(new ChatJobDto
                {
                    Id = job.Id,
                    Name = job.Name,
                    NewMessage = await  _chatRepository.CheckNewMessage(job.Id, user.Id),
                }) ;
            }
            return chatJobs;
        }

    }
}
