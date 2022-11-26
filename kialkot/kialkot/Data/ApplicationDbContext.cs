using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace kialkot.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<CustomToken> CustomTokens { get; set; } = null!;
        public DbSet<Job> Jobs { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasIndex(u => u.NickName)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasMany(u => u.CustomTokens)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId);
            modelBuilder.Entity<CustomToken>()
                .HasIndex(t => t.Token)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasMany(u => u.CreatedJobs)
                .WithOne(t => t.Creator)
                .HasForeignKey(t => t.CreatorId);
            modelBuilder.Entity<User>()
                .HasMany(u => u.WorkedJobs)
                .WithOne(t => t.Worker)
                .HasForeignKey(t => t.WorkerId)
                .OnDelete(DeleteBehavior.SetNull);
            
            modelBuilder.Entity<Job>()
                .HasOne(j => j.Creator)
                .WithMany(u => u.CreatedJobs)
                .HasForeignKey(j => j.CreatorId);
            modelBuilder.Entity<Job>()
                .HasOne(j => j.Worker)
                .WithMany(u => u.WorkedJobs)
                .HasForeignKey(j => j.WorkerId)
                .OnDelete(DeleteBehavior.SetNull);

        }
    }
}
