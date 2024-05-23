using CoffeManagement.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;

namespace CoffeManagement.Repositories.DonHang
{
    public class DonHangRepository : IDonHangRepository
    {
        private readonly string _connectionString;
        public DonHangRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
   
     
        public async Task<IEnumerable<DonHangDTO>> GetAllDonHang()
        {
            List<DonHangDTO> sanPhams = new List<DonHangDTO>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "select idDonHang,tongtien, tenkhachhang, sodienthoai, donhang.ngaydat,donHang.isDelete,soluong from donhang, khachhang where donhang.idKhachHang = khachhang.idKhachHang and donhang.isDelete = 0";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            DonHangDTO sanPham = new DonHangDTO
                            {
                                idDonHang = Convert.ToInt32(reader["idDonHang"]),
                                tenKhachHang = (reader["tenkhachhang"]).ToString(),
                                soDienThoai = (reader["sodienthoai"]).ToString(), 
                                ngayDat = Convert.ToDateTime(reader["ngayDat"]),
                                tongTien = Convert.ToInt32(reader["tongTien"]),
                                isDelete = Convert.ToBoolean(reader["isDelete"]),
                                soLuong = Convert.ToInt32(reader["soLuong"])

                            };
                            sanPhams.Add(sanPham);
                        }
                    }
                }
            }
            return sanPhams;
        }

        public async Task<int> AddDonHang(DonHangDTO donHang)
        {
            int idDonHang = 0;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "INSERT INTO DonHang (ngayDat, idKhachHang, soLuong, tongTien, isDelete) VALUES (@ngayDat, @idKhachHang, @soLuong, @tongTien, @isDelete); SELECT SCOPE_IDENTITY();";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ngayDat", donHang.ngayDat);
                    command.Parameters.AddWithValue("@idKhachHang", donHang.idKhachHang);
                    command.Parameters.AddWithValue("@soLuong", donHang.soLuong); 
                    command.Parameters.AddWithValue("@tongTien", donHang.tongTien);
                    command.Parameters.AddWithValue("@isDelete", 0);

                    idDonHang = Convert.ToInt32(await command.ExecuteScalarAsync());
                }
            }

            return idDonHang;
        }

    }
}
