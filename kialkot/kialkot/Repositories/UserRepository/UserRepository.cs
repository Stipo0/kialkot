using kialkot.Data;
using kialkot.Enums;
using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public UserRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task CreateAsync(User user)
        {
            await _applicationDbContext.AddAsync(user);
            await _applicationDbContext.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(User user)
        {
            _applicationDbContext.Update(user);
            await _applicationDbContext.SaveChangesAsync();
        }

        public Task<User?> GetByNameAsync(string name)
        {
            return _applicationDbContext.Users.FirstOrDefaultAsync(x => x.NickName == name);
        }

        public Task<User?> GetByEmailAsync(string email)
        {
            return _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public Task<User?> GetByIdAsync(int id)
        {
            return _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<bool> CheckExistEmail(string email)
        {
            return _applicationDbContext.Users.AsNoTracking().AnyAsync(x => x.Email == email);
        }
        
        public Task<bool> CheckExistName(string name)
        {
            return _applicationDbContext.Users.AsNoTracking().AnyAsync(x => x.NickName == name);
        }
        public Task<bool> CheckById(int id)
        {
            return _applicationDbContext.Users.AsNoTracking().AnyAsync(x => x.Id == id);
        }

        public Task<List<User>> GetUsers()
        {
            return _applicationDbContext.Users.ToListAsync();
        }
        
        public Task<List<User>> GetUsersByRole(UsersByRole role)
        {
            return _applicationDbContext.Users.Where(x => x.Role == (Role)role).ToListAsync();
        }
    }
}
