using System.Net.Mail;

namespace heavenlybakes.api.Services;

public interface IEmailSender
{
    void SendRegistrationEmail(string toEmail);
    void SendPasswordResetEmail(string toEmail, Guid token);
    SmtpClient SetupSmtpClient();
}