namespace kialkot.Models.Domain
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime SendAt { get; set; }
        public bool NewMessage { get; set; }
        public User User { get; set; } = null!;
        public Job Job { get; set; } = null!;
    }
}
