using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.ChiTietDonHang
{
    public interface IChiTietDonHangRepository
    {
        Task AddChiTietDonHang(ChiTietDonHangDTO chiTietDonHang);
        Task<List<ChiTietDonHangDTO>> GetChiTietDonHang(int idDonHang);
    }
}
