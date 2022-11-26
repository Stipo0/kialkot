using kialkot.Enums;

namespace kialkot.Models.Response
{
    public class MinJobDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public MinUserDto Creator { get; set; } = null!;
        public string Image { get; set; } = string.Empty;
        public JobType JobType { get; set; }
        public DateTime Deadline { get; set; }
        public string JobStatus { get; set; } = string.Empty;
    }
}
