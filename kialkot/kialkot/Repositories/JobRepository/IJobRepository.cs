using kialkot.Enums;
using kialkot.Models.Domain;

namespace kialkot.Repositories.JobRepository
{
    public interface IJobRepository
    {
        Task<Job> CreateAsync(Job job);
        Task UpdateAsync(Job job);
        Task DeleteAsync(Job job);
        Task<Job?> GetJobByIdAsync(int id);
        Task<bool> JobExistsAsync(int id);
        Task<List<Job>> GetJobsByStatusAsync(JobStatusEnum status);
        Task<List<Job>> GetJobsByAnonym();
        Task<List<Job>> GetJobsByCreatorIdAsync(int id);
        Task<List<Job>> GetJobsByWokerIdAsync(int id);

        Task<List<Job>> GetJobsByStatusAndCreatorIdAsync(JobStatusEnum status, int creatorId);
        Task<List<Job>> GetJobsByStatusAndWorkerIdAsync(JobStatusEnum status, int workerId);
    }
}
