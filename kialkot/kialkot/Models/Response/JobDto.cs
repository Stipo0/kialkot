namespace kialkot.Models.Response
{
    public class JobDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public MinUserDto Creator { get; set; } = null!;
        public string Image { get; set; } = string.Empty;
        public string JobType { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string JobStatus { get; set; } = string.Empty;
        public MinUserDto Worker { get; set; } = null!;

    }
}
