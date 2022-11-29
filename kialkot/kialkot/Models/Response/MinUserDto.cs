namespace kialkot.Models.Response
{
    public class MinUserDto
    {
        public int Id { get; set; }
        public string NickName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
