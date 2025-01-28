using System.Net;
using System.Net.Mail;
using System.Text;

namespace heavenlybakes.api.Services;

public class EmailSender : IEmailSender
{
    public SmtpClient SetupSmtpClient()
    {
        var client = new SmtpClient("smtp.gmail.com", 587)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential("houstonsoperdummyemail@gmail.com", "odsp rihz pgju rdpb")
        };

        return client;
    }
    public void SendRegistrationEmail(string toEmail)
    {
        var client = SetupSmtpClient();
        
        // Create email message
        var mailMessage = new MailMessage();
        mailMessage.From = new MailAddress("houstonsoperdummyemail@gmail.com");
        mailMessage.To.Add(toEmail);
        mailMessage.Subject = "User Registered";
        mailMessage.IsBodyHtml = true;
        var mailBody = new StringBuilder();
        mailBody.AppendFormat("<h1>User Registered</h1>");
        mailBody.AppendFormat("<p>Thank you For Registering account</p>");
        mailMessage.Body = mailBody.ToString();

        // Send email
        client.Send(mailMessage);
    }
    
    public void SendPasswordResetEmail(string toEmail, Guid token)
    {
        var passwordResetLink = "http://localhost:3000/reset-password?token=" + token;
        var client = SetupSmtpClient();
        
        // Create email message
        var mailMessage = new MailMessage();
        mailMessage.From = new MailAddress("houstonsoperdummyemail@gmail.com");
        mailMessage.To.Add(toEmail);
        mailMessage.Subject = "Password Reset";
        mailMessage.IsBodyHtml = true;
        var mailBody = new StringBuilder();
        mailBody.AppendFormat("<h1>Password Reset</h1>");
        mailBody.AppendFormat("<p>Follow this link to reset your password</p>");
        mailBody.AppendFormat($"<p>{passwordResetLink}</p>");
        mailMessage.Body = mailBody.ToString();

        // Send email
        client.Send(mailMessage);
    }
}