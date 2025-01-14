using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heavenlybakes.api.Migrations
{
    /// <inheritdoc />
    public partial class AddedDiscountToBake : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Discount",
                table: "Bakes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Bakes_Discount_Range",
                table: "Bakes",
                sql: "[Discount] >= 0 AND [Discount] <= 100");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Bakes_Discount_Range",
                table: "Bakes");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Bakes");
        }
    }
}
