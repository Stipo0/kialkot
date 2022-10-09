using System.ComponentModel.DataAnnotations;

namespace kialkot.Models.Request
{
    public class LoginUserDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
