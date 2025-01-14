using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heavenlybakes.api.Migrations
{
    /// <inheritdoc />
    public partial class RenamedBakeTypeTableToBakeTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bakes_BakeType_BakeTypeId",
                table: "Bakes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BakeType",
                table: "BakeType");

            migrationBuilder.RenameTable(
                name: "BakeType",
                newName: "BakeTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BakeTypes",
                table: "BakeTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bakes_BakeTypes_BakeTypeId",
                table: "Bakes",
                column: "BakeTypeId",
                principalTable: "BakeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bakes_BakeTypes_BakeTypeId",
                table: "Bakes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BakeTypes",
                table: "BakeTypes");

            migrationBuilder.RenameTable(
                name: "BakeTypes",
                newName: "BakeType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BakeType",
                table: "BakeType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bakes_BakeType_BakeTypeId",
                table: "Bakes",
                column: "BakeTypeId",
                principalTable: "BakeType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
