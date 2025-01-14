using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heavenlybakes.api.Migrations
{
    /// <inheritdoc />
    public partial class AddedFK_Bake_BakeType_BakeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.AddForeignKey(
                name: "FK_Bakes_BakeType_BakeTypeId",
                table: "Bakes",
                column: "BakeTypeId",
                principalTable: "BakeType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bakes_BakeType_BakeTypeId",
                table: "Bakes");
        }
    }
}
