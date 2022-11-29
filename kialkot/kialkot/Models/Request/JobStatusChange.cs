using kialkot.Enums;

namespace kialkot.Models.Request
{
    public class JobStatusChange
    {
        public JobStatusChangeEnum Status { get; set; }
        public string Image { get; set; } = null!;
    }
}
