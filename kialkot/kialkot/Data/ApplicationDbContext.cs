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
        }
    }
}
