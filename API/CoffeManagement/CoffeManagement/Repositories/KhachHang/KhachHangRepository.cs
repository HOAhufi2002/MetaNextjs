using CoffeManagement.Models;
using CoffeManagement.Repositories.KhachHang;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.KhachHang
{
    public class KhachHangRepository : IKhachHangRepository
    {
        private readonly string _connectionString;
        public KhachHangRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<int> AddKhachHang(KhachHangDTO khachHang)
        {
            int newCustomerId = 0;
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "INSERT INTO KhachHang (tenKhachHang, soDienThoai, isDelete) VALUES (@tenKhachHang, @soDienThoai, @isDelete); SELECT SCOPE_IDENTITY();";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@tenKhachHang", khachHang.tenKhachHang);
                    command.Parameters.AddWithValue("@soDienThoai", khachHang.soDienThoai);
                    command.Parameters.AddWithValue("@isDelete", 0);
                    newCustomerId = Convert.ToInt32(await command.ExecuteScalarAsync());
                }
            }
            return newCustomerId;
        }

    }
}
