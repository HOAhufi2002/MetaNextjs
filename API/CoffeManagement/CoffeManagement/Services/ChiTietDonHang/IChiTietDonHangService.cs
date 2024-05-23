using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeManagement.Models;

namespace CoffeManagement.Services.ChiTietDonHang
{
    public interface IChiTietDonHangService
    {
        Task AddChiTietDonHang(ChiTietDonHangDTO chiTietDonHang);
        Task<List<ChiTietDonHangDTO>> GetChiTietDonHang(int idDonHang);
    }
}