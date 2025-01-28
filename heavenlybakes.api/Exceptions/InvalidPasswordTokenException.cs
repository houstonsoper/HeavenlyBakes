namespace heavenlybakes.api.Exceptions;

public class InvalidPasswordTokenException : Exception
{
    public InvalidPasswordTokenException(string message) : base(message) { }
}