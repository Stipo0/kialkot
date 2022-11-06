namespace kialkot.Services.SmtpService
{
    public interface ISmtpService
    {
        Task<bool> SendEmail(string to, string subject, string bodyContent);
    }
}
