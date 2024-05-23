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

namespace CoffeManagement.Repositories.LoaiSanPhamRepository
{
    public class LoaiSanPhamRepository : ILoaiSanPhamRepository
    {
        private readonly string _connectionString;
        public LoaiSanPhamRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        private Hashtable InitDataLoaiSanPham(LoaiSanPhamDTO sp, bool isUpdate = false)
        {
            Hashtable val = new Hashtable();
            val.Add("idLoai", sp.idLoai);
            val.Add("tenLoai", sp.tenLoai);
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

        public async Task<IEnumerable<LoaiSanPhamDTO>> getAllSP()
        {
            List<LoaiSanPhamDTO> sanPhams = new List<LoaiSanPhamDTO>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "SELECT tenLoai, idLoai FROM loaisanpham WHERE isDelete = 0";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            LoaiSanPhamDTO sanPham = new LoaiSanPhamDTO
                            {   idLoai = Convert.ToInt32(reader["idLoai"]),
                                tenLoai = reader["tenLoai"].ToString(),
                            };
                            sanPhams.Add(sanPham);
                        }
                    }
                }
            }
            return sanPhams;
        }
        public async Task AddLoaiSanPham(LoaiSanPhamDTO sp)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "INSERT INTO loaisanpham (tenLoai, isDelete) VALUES (@tenLoai, @isDelete)";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@tenLoai", sp.tenLoai);

                    command.Parameters.AddWithValue("@isDelete", 0);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task UpdateLoaiSanPham(LoaiSanPhamDTO sp)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "UPDATE loaisanpham SET tenLoai = @tenLoai,  idLoai = @IdLoai, isDelete = @IsDelete WHERE idLoai = @idLoai";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@tenLoai", sp.tenLoai);
                    command.Parameters.AddWithValue("@idLoai", sp.idLoai);
                    command.Parameters.AddWithValue("@IsDelete", 0);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }



        public async Task DeleteLoaiSanPham(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                string query = "UPDATE LoaiSanPham SET isDelete = 1 WHERE idLoai = @idLoai";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@idLoai", id);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

    }
}
