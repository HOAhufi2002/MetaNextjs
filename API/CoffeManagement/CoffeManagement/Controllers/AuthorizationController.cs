using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data.SqlClient;

namespace CoffeManagement.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthorizationController : Controller
    {
        private readonly string _connectionString;

        public AuthorizationController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            try
            {
                bool isValid = ValidateLogin(username, password);
                if (isValid)
                {
                    string role = GetUserRole(username);
                    // Lưu thông tin đăng nhập vào session hoặc JWT token
                    return Ok(new { message = "Đăng nhập thành công", role = role });
                }
                else
                {
                    return BadRequest(new { message = "Tên đăng nhập hoặc mật khẩu không đúng" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi trong quá trình xác thực", error = ex.Message });
            }
        }

        private bool ValidateLogin(string username, string password)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT COUNT(*) FROM DangNhap WHERE tenDangNhap = @Username AND matKhau = @Password AND isDelete = 0";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", username);
                command.Parameters.AddWithValue("@Password", password);
                int count = (int)command.ExecuteScalar();
                return count > 0;
            }
        }

        private string GetUserRole(string username)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT NQ.tenNhomQuyen FROM NhomQuyen NQ JOIN DangNhap DN ON NQ.idNhomQuyen = DN.idNhomQuyen WHERE DN.tenDangNhap = @Username";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", username);
                string role = (string)command.ExecuteScalar();
                return role;
            }
        }
    }
}
