using CoffeManagement.Models;
using CoffeManagement.Repositories.ChiTietDonHang;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoffeManagement.Services.ChiTietDonHang
{
    public class ChiTietDonHangService : IChiTietDonHangService
    {
        private readonly IChiTietDonHangRepository _repository;

        public ChiTietDonHangService(IChiTietDonHangRepository chiTietDonHangRepository)
        {
            _repository = chiTietDonHangRepository;
        }

        public async Task AddChiTietDonHang(ChiTietDonHangDTO chiTietDonHang)
        {
            // Gọi phương thức AddChiTietDonHang từ repository để thêm chi tiết đơn hàng vào cơ sở dữ liệu
            await _repository.AddChiTietDonHang(chiTietDonHang);
        }
        public async Task<List<ChiTietDonHangDTO>> GetChiTietDonHang(int idDonHang)
        {
            return await _repository.GetChiTietDonHang(idDonHang);
        }
    }
}
