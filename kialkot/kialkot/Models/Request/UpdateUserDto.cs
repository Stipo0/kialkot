using System.ComponentModel.DataAnnotations;

namespace kialkot.Models.Request
{
    public class UpdateUserDto
    {
        [Required]
        public string NickName { get; set; } = string.Empty;
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string NewPassword { get; set; } = string.Empty;
        [Required]
        [Compare("Password", ErrorMessage = "Password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;
    }
}
