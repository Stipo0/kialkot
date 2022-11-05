namespace kialkot.Models.Domain
{
    public class ForgotPasswordToken
    {
        public int Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime Expires { get; set; }
        public bool IsValid { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
