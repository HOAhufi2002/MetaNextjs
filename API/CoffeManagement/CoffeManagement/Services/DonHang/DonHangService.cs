using CoffeManagement.Models;
using CoffeManagement.Repositories.DonHang;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.DonHang
{
    public class DonHangService : IDonHangService
    {
        private IDonHangRepository _reposiory;

        public DonHangService(IDonHangRepository NhanVienRepository)
        {
            _reposiory = NhanVienRepository;
        }
        public async Task<IEnumerable<DonHangDTO>> getAll()
        {
            return await _reposiory.GetAllDonHang();
        }
        public async Task<int> AddDonHang(DonHangDTO donHang)
        {
            return await _reposiory.AddDonHang(donHang);
        }

    }
}
