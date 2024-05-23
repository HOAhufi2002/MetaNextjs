using CoffeManagement.Models;
using CoffeManagement.Repositories.KhachHang;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoffeManagement.Services.KhachHang
{
    public class KhachHangService : IKhachHangService
    {
        private readonly IKhachHangRepository _khachHangRepository;
        public KhachHangService(IKhachHangRepository khachHangRepository)
        {
            _khachHangRepository = khachHangRepository;
        }


        public async Task<int> AddKhachHang(KhachHangDTO khachHang)
        {
            int newCustomerId = await _khachHangRepository.AddKhachHang(khachHang);
            return newCustomerId;
        }



   
    }
}
