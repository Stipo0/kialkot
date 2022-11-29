using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;

namespace kialkot.Services.JobService
{
    public interface IJobService
    {
        Task<JobDto> CreateJobAsync(User user,CreateJobDto createJobDto);
        Task<List<MinJobDto>> GetJobByStatus(JobStatusEnum status);
        Task<JobDto> GetJobById(int id);
        Task UpdateJobAsync(Job job, UpdateJobDto updateJobDto);
        Task DeleteJobAsync(Job job);
        Task DesingerAcceptJob(Job job, User user);
        Task DesingerUpdateJobStatus(Job job, JobStatusChangeEnum status);
        Task DesingerCancelJob(Job job);


    }
}
