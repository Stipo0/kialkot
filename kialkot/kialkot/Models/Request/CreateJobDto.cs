using kialkot.Enums;
using System.ComponentModel.DataAnnotations;

namespace kialkot.Models.Request
{
    public class CreateJobDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        [Required]
        public JobType JobType { get; set; }
        [Required]
        public DateTime Deadline { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
