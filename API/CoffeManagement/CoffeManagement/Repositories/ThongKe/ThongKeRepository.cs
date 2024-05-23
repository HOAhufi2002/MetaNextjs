using CoffeManagement.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.ThongKe
{
    public class ThongKeRepository : IThongKeRepository
    {
        private readonly string _connectionString;
        public ThongKeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<ThongKeDTO>> ThongKeTheoTen()
        {
            List<ThongKeDTO> thongKe = new List<ThongKeDTO>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"
                    SELECT 
                        KhachHang.tenKhachHang AS TenKhachHang,
                        COUNT(DISTINCT DonHang.idDonHang) AS SoLuongDonHang,
                        SUM(ChiTietDonHang.soluong) AS SoLuongMatHang,
                        SUM(DonHang.tongTien) AS TongTien
                    FROM
                        DonHang
                    JOIN
                        KhachHang ON DonHang.idKhachHang = KhachHang.idKhachHang
                    JOIN
                        ChiTietDonHang ON DonHang.idDonHang = ChiTietDonHang.idDonHang
                    WHERE
                        DonHang.isDelete = 0
                    GROUP BY
                        KhachHang.tenKhachHang;
                ";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    SqlDataReader reader = await command.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        ThongKeDTO thongKeItem = new ThongKeDTO();
                        thongKeItem.TenKhachHang = reader["TenKhachHang"].ToString();
                        thongKeItem.SoLuongDonHang = Convert.ToInt32(reader["SoLuongDonHang"]);
                        thongKeItem.SoLuongMatHang = Convert.ToInt32(reader["SoLuongMatHang"]);
                        thongKeItem.TongTien = Convert.ToDecimal(reader["TongTien"]);
                        thongKe.Add(thongKeItem);
                    }
                }
            }
            return thongKe;
        }

        public async Task<IEnumerable<ThongKeDTO>> ThongKeTheoNgay()
        {
            List<ThongKeDTO> thongKe = new List<ThongKeDTO>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = @"
                    SELECT 
                        DonHang.ngayDat AS NgayDat,
                        COUNT(DonHang.idDonHang) AS SoLuongDonHang,
                        SUM(DonHang.tongTien) AS TongTien
                    FROM
                        DonHang
                    WHERE
                        DonHang.isDelete = 0
                    GROUP BY
                        DonHang.ngayDat;
                ";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    SqlDataReader reader = await command.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        ThongKeDTO thongKeItem = new ThongKeDTO();
                        thongKeItem.NgayDat = Convert.ToDateTime(reader["NgayDat"]);
                        thongKeItem.SoLuongDonHang = Convert.ToInt32(reader["SoLuongDonHang"]);
                        thongKeItem.TongTien = Convert.ToDecimal(reader["TongTien"]);
                        thongKe.Add(thongKeItem);
                    }
                }
            }
            return thongKe;
        }
    }
}
