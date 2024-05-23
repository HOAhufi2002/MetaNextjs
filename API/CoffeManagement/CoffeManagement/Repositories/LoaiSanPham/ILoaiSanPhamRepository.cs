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
    public interface ILoaiSanPhamRepository
    {
        Task<IEnumerable<LoaiSanPhamDTO>> getAllSP();
        Task DeleteLoaiSanPham(int id);
        Task UpdateLoaiSanPham(LoaiSanPhamDTO sp);
        Task AddLoaiSanPham(LoaiSanPhamDTO sp);
    }
}
