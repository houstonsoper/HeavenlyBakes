using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heavenlybakes.api.Migrations
{
    /// <inheritdoc />
    public partial class AddedBakeType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Bakes");

            migrationBuilder.AddColumn<int>(
                name: "BakeTypeId",
                table: "Bakes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BakeType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_BakeType", x => x.Id); });

            migrationBuilder.CreateIndex(
                name: "IX_Bakes_BakeTypeId",
                table: "Bakes",
                column: "BakeTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BakeType");

            migrationBuilder.DropIndex(
                name: "IX_Bakes_BakeTypeId",
                table: "Bakes");

            migrationBuilder.DropColumn(
                name: "BakeTypeId",
                table: "Bakes");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Bakes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }
    }
}
