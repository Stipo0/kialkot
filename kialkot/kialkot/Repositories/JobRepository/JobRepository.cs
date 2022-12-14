using kialkot.Data;
using kialkot.Enums;
using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Repositories.JobRepository
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _context;

        public JobRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Job> CreateAsync(Job job)
        {
            await _context.Jobs.AddAsync(job);
            await _context.SaveChangesAsync();
            return job;
        }
        public async Task UpdateAsync(Job job)
        {
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Job job)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }

        public async Task<Job?> GetJobByIdAsync(int id)
        {
            return await _context.Jobs
                .Include(job => job.Creator)
                .Include(job => job.Worker)
                .FirstOrDefaultAsync(job => job.Id == id);
        }
        
        public Task<List<Job>> GetJobsByStatusAsync(JobStatusEnum status)
        {
            return _context.Jobs.Include(job=> job.Creator)
                .Where(x => x.Status == status)
                .ToListAsync();
        }
        public Task<List<Job>> GetJobsByAnonym()
        {
            return _context.Jobs.Where(x => x.Status == JobStatusEnum.Open).ToListAsync();
        }

        public Task<List<Job>> GetJobsByStatusAndCreatorIdAsync(JobStatusEnum status, int creatorId)
        {
            return _context.Jobs.Include(job => job.Creator)
                .Where(x => x.Status == status && x.CreatorId == creatorId)
                .ToListAsync();
        }

        public Task<List<Job>> GetJobsByStatusAndWorkerIdAsync(JobStatusEnum status, int workerId)
        {
            return _context.Jobs.Include(job => job.Creator)
                .Where(x => x.Status == status && (x.WorkerId == workerId || x.WorkerId == null))
                .ToListAsync();
        }

        public Task<bool> JobExistsAsync(int id)
        {
            return _context.Jobs.AnyAsync(job => job.Id == id);
        }
        
        public Task<List<Job>> GetJobsByCreatorIdAsync(int id)
        {
            return _context.Jobs.Where(x => x.CreatorId == id).ToListAsync();
        }

        public Task<List<Job>> GetJobsByWokerIdAsync(int id)
        {
            return _context.Jobs.Where(x => x.WorkerId == id).ToListAsync();
        }

        public async Task DeleteWorkerFromJobAsync(Job job)
        {
            job.WorkerId = null;
            job.Worker = null;
            job.Status = JobStatusEnum.Open;
            await UpdateAsync(job);
        }

        public Task<List<Job>> GetJobsByUserIdAsync(int id)
        {
            return _context.Jobs.Where(x => x.CreatorId == id || x.WorkerId == id && x.WorkerId != null).ToListAsync();
        }
    }
}
