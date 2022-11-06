using kialkot.Models.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace kialkot.Services.SmtpService
{
    public class SmtpService : ISmtpService
    {
        private readonly SmtpOptions _smtpOptions;
        public SmtpService(IOptions<SmtpOptions> stmpoptions)
        {
            _smtpOptions = stmpoptions.Value;
        }
        
        public async Task<bool> SendEmail(string to, string subject, string bodyContent)
        {
            try
            {
                var mail = new MimeMessage();
                mail.From.Add(new MailboxAddress(_smtpOptions.DisplayName, _smtpOptions.From));
                mail.Sender = new MailboxAddress(_smtpOptions.DisplayName, _smtpOptions.From);
                mail.To.Add(MailboxAddress.Parse(to));

                var body = new BodyBuilder();
                mail.Subject = subject;
                body.HtmlBody = bodyContent;
                mail.Body = body.ToMessageBody();


                using var smtp = new SmtpClient();

                if (_smtpOptions.UseSSL)
                {
                    await smtp.ConnectAsync(_smtpOptions.Host, _smtpOptions.Port, SecureSocketOptions.SslOnConnect);
                }
                else if (_smtpOptions.UseStartTls)
                {
                    await smtp.ConnectAsync(_smtpOptions.Host, _smtpOptions.Port, SecureSocketOptions.StartTls);
                }
                await smtp.AuthenticateAsync(_smtpOptions.UserName, _smtpOptions.Password);
                await smtp.SendAsync(mail);
                await smtp.DisconnectAsync(true);

                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
