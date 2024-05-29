using CoffeManagement.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.Account
{

    public class TaiKhoanRepository : ITaiKhoanRepository
    {
        private readonly string _connectionString;
        public TaiKhoanRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            List<UserDTO> users = new List<UserDTO>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"SELECT hoTen, email, soDienThoai, ngaySinh, diaChi, gioiTinh, tenDangNhap, matkhau, tenNhomQuyen , d.idNhomQuyen
                                 FROM nguoidung n
                                 JOIN dangnhap d ON n.idDangNhap = d.idDangNhap
                                 JOIN nhomquyen nq ON d.idNhomQuyen = nq.idNhomQuyen
                                 WHERE n.isDelete = 0"; 
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            UserDTO user = new UserDTO
                            {
                                HoTen = reader["hoTen"].ToString(),
                                Email = reader["email"].ToString(),
                                SoDienThoai = reader["soDienThoai"].ToString(),
                                NgaySinh = Convert.ToDateTime(reader["ngaySinh"]),
                                DiaChi = reader["diaChi"].ToString(),
                                GioiTinh = reader["gioiTinh"].ToString(),
                                TenDangNhap = reader["tenDangNhap"].ToString(),
                                MatKhau = reader["matkhau"].ToString(),
                                TenNhomQuyen = reader["tenNhomQuyen"].ToString()

                            };
                            users.Add(user);
                        }
                    }
                }
            }
            return users;
        }
        public async Task AddUser(UserDTO user)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Thêm dữ liệu vào bảng dangnhap
                string insertLoginQuery = @"
            INSERT INTO dangnhap (tenDangNhap, matkhau, idNhomQuyen,isDelete)
            VALUES (@TenDangNhap, @MatKhau, @IdNhomQuyen,0);
            SELECT SCOPE_IDENTITY();"; // Lấy idDangNhap mới được tạo

                using (SqlCommand loginCommand = new SqlCommand(insertLoginQuery, connection))
                {
                    // Thêm các tham số vào câu lệnh SQL
                    loginCommand.Parameters.AddWithValue("@TenDangNhap", user.TenDangNhap);
                    loginCommand.Parameters.AddWithValue("@MatKhau", user.MatKhau);
                    loginCommand.Parameters.AddWithValue("@IdNhomQuyen", user.idNhomQuyen);
 
                    // Thực thi câu lệnh SQL và lấy idDangNhap mới
                    int idDangNhap = Convert.ToInt32(await loginCommand.ExecuteScalarAsync());

                    // Thêm dữ liệu vào bảng nguoidung
                    string insertUserQuery = @"
                INSERT INTO nguoidung (hoTen, email, soDienThoai, ngaySinh, diaChi, gioiTinh, idDangNhap, isDelete)
                VALUES (@HoTen, @Email, @SoDienThoai, @NgaySinh, @DiaChi, @GioiTinh, @IdDangNhap, 0);";

                    using (SqlCommand userCommand = new SqlCommand(insertUserQuery, connection))
                    {
                        // Thêm các tham số vào câu lệnh SQL
                        userCommand.Parameters.AddWithValue("@HoTen", user.HoTen);
                        userCommand.Parameters.AddWithValue("@Email", user.Email);
                        userCommand.Parameters.AddWithValue("@SoDienThoai", user.SoDienThoai);
                        userCommand.Parameters.AddWithValue("@NgaySinh", user.NgaySinh);
                        userCommand.Parameters.AddWithValue("@DiaChi", user.DiaChi);
                        userCommand.Parameters.AddWithValue("@GioiTinh", user.GioiTinh);
                        userCommand.Parameters.AddWithValue("@IdDangNhap", idDangNhap); // Sử dụng idDangNhap mới

                        // Thực thi câu lệnh SQL
                        await userCommand.ExecuteNonQueryAsync();
                    }
                }
            }
        }

        public async Task<bool> CheckExistAccount(string tenDangNhap)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                string query = @"SELECT COUNT(*) FROM dangnhap WHERE tenDangNhap = @TenDangNhap AND isDelete = 0";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TenDangNhap", tenDangNhap);
                    int count = Convert.ToInt32(await command.ExecuteScalarAsync());

                    return count > 0;
                }
            }
        }





    }
}
