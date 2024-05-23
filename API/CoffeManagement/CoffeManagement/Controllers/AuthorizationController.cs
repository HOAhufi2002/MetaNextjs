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
                    var userData = GetUserData(username);
                    if (userData != null)
                    {
                        return Ok(new
                        {
                            message = "Đăng nhập thành công",
                            userId = userData.userId,
                            username = userData.username,
                            roleName = userData.roleName,
                            tenNhomQuyen = userData.tenNhomQuyen
                        });
                    }
                    else
                    {
                        return StatusCode(500, new { message = "Không thể lấy thông tin người dùng" });
                    }
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

        private UserData GetUserData(string username)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = @"SELECT n.idNguoiDung,  d.tenDangNhap, nq.tenNhomQuyen, q.tenQuyen
                        FROM nguoidung n 
                        JOIN dangnhap d ON n.idDangNhap = d.idDangNhap
                        JOIN nhomquyen nq ON d.idNhomQuyen = nq.idNhomQuyen
                        JOIN quyen q ON nq.idQuyen = q.idQuyen
                        WHERE  d.tenDangNhap = @Username";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", username);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new UserData
                        {
                            userId = reader.GetInt32(0),
                            username = reader.GetString(1),
                            roleName = reader.GetString(2),
                            tenNhomQuyen = reader.GetString(3)
                        };
                    }
                    else
                    {
                        return null;
                    }
                }
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

       

    }
}
public class UserData
{
    public int userId { get; set; }
    public string tenNhomQuyen { get; set; }
    public string username { get; set; }
    public string roleName { get; set; }

}