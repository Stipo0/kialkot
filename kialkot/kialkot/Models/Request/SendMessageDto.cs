using System.ComponentModel.DataAnnotations;

namespace kialkot.Models.Request
{
    public class SendMessageDto
    {
        [Required]
        [MinLength(3)]
        public string Message { get; set; } = string.Empty;
    }
}
