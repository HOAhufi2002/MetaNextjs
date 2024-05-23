using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.DonHang
{
    public interface IDonHangRepository
    {
        Task<IEnumerable<DonHangDTO>> GetAllDonHang();
        Task<int> AddDonHang(DonHangDTO donHang);


    }
}
