using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeManagement.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly ILogger<AuthorizationController> _logger;
        private readonly IConfiguration _config;


        public AuthorizationController(IConfiguration configuration, ILogger<AuthorizationController> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _logger = logger;
            _config = configuration;

        }

        private string HashPassword(string password)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                byte[] hashBytes = sha1.ComputeHash(bytes);
                string hashString = Convert.ToBase64String(hashBytes);
                return hashString;
            }

        }

        private async Task<string> CreateToken(UserData userData)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));
            var EXPIRE_HOURS = _config["JWT:JwtExpireHours"];
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = new List<Claim>{
                new Claim("UserId", userData.UserId.ToString()),
                new Claim("Username", userData.Username),
                new Claim("TenNhomQuyen", userData.TenNhomQuyen)
            };
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(int.Parse(EXPIRE_HOURS)),
                SigningCredentials = credentials
            };
            var token = tokenHandler.CreateToken(descriptor);
            return await Task.FromResult(tokenHandler.WriteToken(token));
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { message = "Invalid login request" });
            }

            try
            {
                bool isValid = await ValidateLoginAsync(loginRequest.Username, loginRequest.Password);
                if (isValid)
                {
                    var userData = await GetUserDataAsync(loginRequest.Username);
                    if (userData != null)
                    {
                        var token = await CreateToken(userData);
                        return Ok(new
                        {
                            UserId = userData.UserId,
                            Username = userData.Username,
                            TenNhomQuyen = userData.TenNhomQuyen,
                            token
                        });
                    }
                    else
                    {
                        return StatusCode(500, new { message = "Could not retrieve user information" });
                    }
                }
                else
                {
                    return BadRequest(new { message = "Incorrect username or password" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during login.");
                return StatusCode(500, new { message = "An error occurred during authentication", error = ex.Message });
            }
        }

        private async Task<UserData> GetUserDataAsync(string username)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"
                    SELECT n.idNguoiDung, d.tenDangNhap, nq.tenNhomQuyen
                    FROM nguoidung n 
                    JOIN dangnhap d ON n.idDangNhap = d.idDangNhap
                    JOIN nhomquyen nq ON d.idNhomQuyen = nq.idNhomQuyen
                    WHERE d.tenDangNhap = @Username";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", username);
                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        // Ensure indices are within bounds
                        if (reader.FieldCount >= 3)
                        {
                            return new UserData
                            {
                                UserId = reader.GetInt32(0),
                                Username = reader.GetString(1),
                                TenNhomQuyen = reader.GetString(2)
                            };
                        }
                        else
                        {
                            _logger.LogError("Unexpected number of columns returned from the database.");
                            throw new InvalidOperationException("Unexpected number of columns returned from the database.");
                        }
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        private async Task<bool> ValidateLoginAsync(string username, string password)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "SELECT COUNT(*) FROM DangNhap WHERE tenDangNhap = @Username AND matKhau = @Password AND isDelete = 0";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", username);
                // Use a secure hash comparison method for passwords
                command.Parameters.AddWithValue("@Password",password);
                int count = (int)await command.ExecuteScalarAsync();
                return count > 0;
            }
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserData
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string TenNhomQuyen { get; set; }
    }
}
