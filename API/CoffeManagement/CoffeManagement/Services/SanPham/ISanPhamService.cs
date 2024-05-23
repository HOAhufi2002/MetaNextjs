using CoffeManagement.Models;
using CoffeManagement.Repositories.SanPham;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace CoffeManagement.Services
{
    public interface ISanPhamService
    {
        Task<IEnumerable<SanPhamDTO>> getAllSP(string keyword);
        Task AddSanPham(SanPhamDTO sp);
        Task UpdateSanPham(SanPhamDTO sp);
        Task DeleteSanPham(int id);
    }
}
