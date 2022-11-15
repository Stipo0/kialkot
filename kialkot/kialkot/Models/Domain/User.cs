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
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int RefreshTokenId { get; set; }
        public RefreshToken? RefreshToken { get; set; }
        public int ForgotPasswordId { get; set; }
        public ForgotPasswordToken? ForgotPasswordToken { get; set; }


    }
}
