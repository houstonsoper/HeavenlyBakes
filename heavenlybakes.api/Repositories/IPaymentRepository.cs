using heavenlybakes.api.Models;

namespace heavenlybakes.api.Repositories;

public interface IPaymentRepository
{
    Task<IEnumerable<PaymentMethod>> GetPaymentMethods();
}