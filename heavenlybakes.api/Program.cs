using System.Text;
using heavenlybakes.api.Contexts;
using heavenlybakes.api.Middleware;
using heavenlybakes.api.Repositories;
using heavenlybakes.api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;


// Add services to the container.

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000") //front-end URL
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddDbContext<HeavenlyBakesDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration["ConnectionStrings:HeavenlyBakesDbContextConnection"]);
});

//Add session services
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = "userSession";
    options.IdleTimeout = TimeSpan.FromDays(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
    options.Cookie.SameSite = SameSiteMode.None; 
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IBakesRepository, BakesRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddTransient<IEmailSender,EmailSender>();
builder.Services.AddTransient<GlobalExceptionHandlerMiddleware>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPasswordTokenService, PasswordTokenService>();
builder.Services.AddScoped<IPasswordTokenRepository, PasswordTokenRepository>();
builder.Services.AddScoped<IUserGroupRepository, UserGroupRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderStatusesRepository, OrderStatusesRepository>();
builder.Services.AddScoped<IOrderStatusesService, OrderStatusesService>();
builder.Services.AddScoped<IBakesService, BakesService>();
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
app.UseSession();
app.UseRouting();
app.MapControllers();

app.Run();
