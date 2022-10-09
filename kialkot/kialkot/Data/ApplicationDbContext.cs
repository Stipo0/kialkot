using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
