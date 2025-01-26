using heavenlybakes.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace heavenlybakes.api.Configurations;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.Password)
            .IsRequired()
            .HasMaxLength(200);
        
        builder
            .HasOne(u => u.UserGroup)
            .WithMany()
            .HasForeignKey(u => u.UserGroupId);
    }
}