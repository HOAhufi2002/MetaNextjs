using CoffeManagement.Models;
using CoffeManagement.Repositories.LoaiSanPhamRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.LoaiSanPham
{
    public class LoaiSanPhamService : ILoaiSanPhamService
    {
        private ILoaiSanPhamRepository _reposiory;

        public LoaiSanPhamService(ILoaiSanPhamRepository NhanVienRepository)
        {
            _reposiory = NhanVienRepository;
        }
        public async Task<IEnumerable<LoaiSanPhamDTO>> getAllSP()
        {
            return await _reposiory.getAllSP();
        }
        public async Task AddLoaiSanPham(LoaiSanPhamDTO sp)
        {
            await _reposiory.AddLoaiSanPham(sp);
        }
        public async Task UpdateLoaiSanPham(LoaiSanPhamDTO sp)
        {
            await _reposiory.UpdateLoaiSanPham(sp);
        }

        public async Task DeleteLoaiSanPham(int id)
        {
            await _reposiory.DeleteLoaiSanPham(id);
        }
    }
}
