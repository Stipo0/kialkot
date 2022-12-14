using kialkot.Enums;

namespace kialkot.Models.Domain
{
    public class Job
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public JobType JobType { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? WorkerId { get; set; }
        public JobStatusEnum Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime EndDate { get; set; }
        public User Creator { get; set; } = null!;
        public User? Worker { get; set; } = null!;
        public List<ChatMessage> Messages { get; set; } = null!;
    }
}
