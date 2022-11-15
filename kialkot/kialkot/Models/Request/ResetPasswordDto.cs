using System.ComponentModel.DataAnnotations;

namespace kialkot.Models.Request
{
    public class ResetPasswordDto
    {
        [Required]
        public string NewPassword { get; set; } = string.Empty;
        
        [Compare("NewPassword", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
