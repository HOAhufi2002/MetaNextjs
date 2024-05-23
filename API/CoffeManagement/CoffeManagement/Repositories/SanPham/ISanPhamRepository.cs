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
    public interface ISanPhamRepository
    {
        Task<IEnumerable<SanPhamDTO>> getAllSP(string searchKeyword);
        Task AddSanPham(SanPhamDTO sanPham);
        Task DeleteSanPham(int id);
        Task UpdateSanPham(SanPhamDTO sp);
    }
}
