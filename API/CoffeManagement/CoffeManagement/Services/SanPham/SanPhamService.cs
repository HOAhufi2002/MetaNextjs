using CoffeManagement.Models;
using CoffeManagement.Repositories.SanPham;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace CoffeManagement.Services
{

    public class SanPhamService : ISanPhamService
    {
        private ISanPhamRepository _reposiory;

        public SanPhamService(ISanPhamRepository NhanVienRepository)
        {
            _reposiory = NhanVienRepository;
        }
        public async Task<IEnumerable<SanPhamDTO>> getAllSP(string searchKeyword)
        {
            return await _reposiory.getAllSP(searchKeyword);
        }
        public async Task AddSanPham(SanPhamDTO sp)
        {
            await _reposiory.AddSanPham(sp);
        }
        public async Task UpdateSanPham( SanPhamDTO sp)
        {
            await _reposiory.UpdateSanPham(sp);
        }

        public async Task DeleteSanPham(int id)
        {
            await _reposiory.DeleteSanPham(id);
        }
    }
}
