using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.LoaiSanPham
{
    public interface ILoaiSanPhamService
    {
        Task<IEnumerable<LoaiSanPhamDTO>> getAllSP();
        Task UpdateLoaiSanPham(LoaiSanPhamDTO sp);
        Task AddLoaiSanPham(LoaiSanPhamDTO sp);
        Task DeleteLoaiSanPham(int id);
    }
}
