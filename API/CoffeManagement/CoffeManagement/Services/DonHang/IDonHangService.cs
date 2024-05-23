using CoffeManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoffeManagement.Services.DonHang
{
    public interface IDonHangService
    {
        Task<IEnumerable<DonHangDTO>> getAll();
        Task<int> AddDonHang(DonHangDTO donHang);
    }
}
