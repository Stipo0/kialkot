using kialkot.Enums;

namespace kialkot.Models.Response
{
    public class JobDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public MinUserDto Creator { get; set; } = null!;
        public string Image { get; set; } = string.Empty;
        public JobType JobType { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public JobStatusEnum JobStatus { get; set; }
        public MinUserDto Worker { get; set; } = null!;

    }
}
