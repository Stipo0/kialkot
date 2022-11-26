using kialkot.Enums;
using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;

namespace kialkot.Services.JobService
{
    public interface IJobService
    {
        Task CreateJobAsync(User user,CreateJobDto createJobDto);
        Task<List<MinJobDto>> GetJobByStatus(JobStatusEnum status);
    }
}
