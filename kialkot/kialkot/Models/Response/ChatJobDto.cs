namespace kialkot.Models.Response
{
    public class ChatJobDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool NewMessage { get; set; }
    }
}
