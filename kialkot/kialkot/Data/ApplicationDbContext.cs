using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet <ForgotPasswordToken> ForgotPasswordTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(x => x.RefreshToken)
                .WithOne(x => x.User)
                .HasForeignKey<RefreshToken>(x => x.UserId);

            modelBuilder.Entity<User>()
               .HasOne(x => x.ForgotPasswordToken)
               .WithOne(x => x.User)
               .HasForeignKey<ForgotPasswordToken>(x => x.UserId);
        }
    }
}
