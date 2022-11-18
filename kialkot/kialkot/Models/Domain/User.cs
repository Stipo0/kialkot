using kialkot.Enums;

namespace kialkot.Models.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string NickName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public Role Role { get; set; }
        public bool Verified { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<CustomToken> CustomTokens { get; set; } = null!;
        
        

    }
}
