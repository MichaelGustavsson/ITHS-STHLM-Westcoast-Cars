using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Vehicles_API.Data;
using Vehicles_API.Helpers;
using Vehicles_API.Interfaces;
using Vehicles_API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Skapa databas koppling...
builder.Services.AddDbContext<VehicleContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"))
);

// Sätt upp Identity hanteringen.
builder.Services.AddIdentity<IdentityUser, IdentityRole>(
  options =>
    {
      options.Password.RequireLowercase = true;
      options.Password.RequireUppercase = true;
      options.Password.RequiredLength = 6;
      options.Password.RequireNonAlphanumeric = false;

      options.User.RequireUniqueEmail = true;

      options.Lockout.MaxFailedAccessAttempts = 5;
      options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    }
).AddEntityFrameworkStores<VehicleContext>();

builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(
          Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("apiKey"))
      ),
    ValidateLifetime = true,
    ValidateAudience = false,
    ValidateIssuer = false,
    ClockSkew = TimeSpan.Zero
  };
});

// Depency injection för våra egna Interface och klasser...
// builder.Services.AddScoped<Interface, konkret klass som implementerar föregånde interface>...
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IManufacturerRepository, ManufacturerRepository>();

// Add automapper...
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Regler för vilka avsändare som får lov att komma in hos oss...
builder.Services.AddCors(options =>
{
  options.AddPolicy("WestcoastCors",
    policy =>
    {
      policy.AllowAnyHeader();
      policy.AllowAnyMethod();
      policy.WithOrigins(
        "http://127.0.0.1:5500",
        "http://localhost:3000");
    }
  );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("WestcoastCors");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
  var context = services.GetRequiredService<VehicleContext>();
  await context.Database.MigrateAsync();
  await LoadData.LoadManufacturers(context);
  await LoadData.LoadVehicles(context);
}
catch (Exception ex)
{
  var logger = services.GetRequiredService<ILogger<Program>>();
  logger.LogError(ex, "Ett fel inträffade när migrering utfördes");
}

await app.RunAsync();
