namespace kialkot.Models.Response
{
    public class GetMessagesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserNickName { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool NewMessage { get; set; }
        public DateTime SendAt { get; set; }
    }
}
