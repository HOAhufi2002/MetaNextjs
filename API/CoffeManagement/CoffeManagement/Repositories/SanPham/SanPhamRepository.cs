using CoffeManagement.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.SanPham
{
    public class SanPhamRepository : ISanPhamRepository
    {
        private readonly string _connectionString;
        public SanPhamRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        private Hashtable InitDataSanPham(SanPhamDTO sp, bool isUpdate = false)
        {
            Hashtable val = new Hashtable();
            val.Add("idSanPham", sp.idSanPham);
            val.Add("tenSanPham", sp.tenSanPham);
            val.Add("gia", sp.gia);
            val.Add("idLoai", sp.idLoai);
            if (isUpdate)
            {
                val.Add("isDelete", sp.isDelete);
            }
            else
            {
                val.Add("isDelete", 0);
            }
            return val;
        }

        public async Task<IEnumerable<SanPhamDTO>> getAllSP(string searchKeyword)
        {
            List<SanPhamDTO> sanPhams = new List<SanPhamDTO>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "SELECT tenSanPham, idSanPham, gia, idLoai FROM SanPham WHERE isDelete = 0";

                // Thêm điều kiện tìm kiếm tương đối nếu có từ khóa tìm kiếm được cung cấp
                if (!string.IsNullOrEmpty(searchKeyword))
                {
                    query += " AND tenSanPham LIKE @SearchKeyword";
                }

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Thêm giá trị của từ khóa tìm kiếm vào tham số của câu truy vấn SQL
                    if (!string.IsNullOrEmpty(searchKeyword))
                    {
                        command.Parameters.AddWithValue("@SearchKeyword", "%" + searchKeyword + "%");
                    }

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            SanPhamDTO sanPham = new SanPhamDTO
                            {
                                idSanPham = Convert.ToInt32(reader["idSanPham"]),
                                tenSanPham = reader["tenSanPham"].ToString(),
                                gia = Convert.ToDecimal(reader["gia"]),
                                idLoai = Convert.ToInt32(reader["idLoai"])
                            };
                            sanPhams.Add(sanPham);
                        }
                    }
                }
            }
            return sanPhams;
        }

        public async Task AddSanPham(SanPhamDTO sp)
        {
            Hashtable data = InitDataSanPham(sp);
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "INSERT INTO SanPham (tenSanPham, gia, idLoai, isDelete) VALUES (@TenSanPham, @Gia, @IdLoai, @IsDelete)";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TenSanPham", sp.tenSanPham);
                    command.Parameters.AddWithValue("@Gia", sp.gia);
                    command.Parameters.AddWithValue("@IdLoai", sp.idLoai);
                    command.Parameters.AddWithValue("@IsDelete", 0);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task UpdateSanPham(SanPhamDTO sp)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "UPDATE SanPham SET tenSanPham = @TenSanPham, gia = @Gia, idLoai = @IdLoai, isDelete = @IsDelete WHERE idSanPham = @IdSanPham";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TenSanPham", sp.tenSanPham);
                    command.Parameters.AddWithValue("@Gia", sp.gia);
                    command.Parameters.AddWithValue("@IdLoai", sp.idLoai);
                    command.Parameters.AddWithValue("@IsDelete", 0);
                    command.Parameters.AddWithValue("@IdSanPham", sp.idSanPham);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }



        public async Task DeleteSanPham(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "UPDATE SanPham SET isDelete = 1 WHERE idSanPham = @IdSanPham";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdSanPham", id);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

    }
}
