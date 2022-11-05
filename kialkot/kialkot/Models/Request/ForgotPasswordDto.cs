using System.ComponentModel.DataAnnotations;

namespace kialkot.Models.Request
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
