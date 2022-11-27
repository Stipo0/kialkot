using kialkot.Enums;
using kialkot.Models.Domain;

namespace kialkot.Repositories.JobRepository
{
    public interface IJobRepository
    {
        Task CreateAsync(Job job);
        Task UpdateAsync(Job job);
        Task<Job?> GetJobByIdAsync(int id);
        Task<bool> JobExistsAsync(int id);
        Task<List<Job>> GetJobsByStatusAsync(JobStatusEnum status);
        Task<List<Job>> GetJobsByCreatorIdAsync(int id);
        Task<List<Job>> GetJobsByWokerIdAsync(int id);
    }
}
