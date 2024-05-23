// ChiTietDonHangRepository.cs
using CoffeManagement.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.ChiTietDonHang
{
    public class ChiTietDonHangRepository : IChiTietDonHangRepository
    {
        private readonly string _connectionString;

        public ChiTietDonHangRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<List<ChiTietDonHangDTO>> GetChiTietDonHang(int idDonHang)
        {
            List<ChiTietDonHangDTO> chiTietDonHangs = new List<ChiTietDonHangDTO>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                string query = @"SELECT SanPham.TenSanPham, ChiTietDonHang.gia, ChiTietDonHang.soLuong
                                 FROM ChiTietDonHang
                                 INNER JOIN SanPham ON ChiTietDonHang.idSanPham = SanPham.idSanPham
                                 INNER JOIN DonHang ON ChiTietDonHang.idDonHang = DonHang.idDonHang
                                 WHERE DonHang.idDonHang = @idDonHang";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@idDonHang", idDonHang);

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            ChiTietDonHangDTO chiTietDonHang = new ChiTietDonHangDTO();
                            chiTietDonHang.tenSanPham = reader["TenSanPham"].ToString();
                            chiTietDonHang.gia = Convert.ToInt32(reader["gia"]);
                            chiTietDonHang.soLuong = Convert.ToInt32(reader["soLuong"]);

                            chiTietDonHangs.Add(chiTietDonHang);
                        }
                    }
                }
            }

            return chiTietDonHangs;
        }
        public async Task AddChiTietDonHang(ChiTietDonHangDTO chiTietDonHang)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                string query = "INSERT INTO ChiTietDonHang (idDonHang, idSanPham, soLuong, gia) VALUES (@idDonHang, @idSanPham, @soLuong, @gia)";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@idDonHang", chiTietDonHang.idDonHang);
                    command.Parameters.AddWithValue("@idSanPham", chiTietDonHang.idSanPham);
                    command.Parameters.AddWithValue("@soLuong", chiTietDonHang.soLuong);
                    command.Parameters.AddWithValue("@gia", chiTietDonHang.gia);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
