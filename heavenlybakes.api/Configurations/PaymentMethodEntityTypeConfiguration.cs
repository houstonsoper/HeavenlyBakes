using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class PaymentMethodEntityTypeConfiguration : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> builder)
    {
        builder.HasData(
            new PaymentMethod { Id = 1, Method = "Not Specified" },
            new PaymentMethod { Id = 2, Method = "Cash" },
            new PaymentMethod { Id = 3, Method = "Card" }
            );
    }
}