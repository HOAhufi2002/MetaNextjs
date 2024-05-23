using CoffeManagement.Models;
using CoffeManagement.Services.ChiTietDonHang;
using CoffeManagement.Services.DonHang;
using CoffeManagement.Services.KhachHang;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CoffeManagement.Controllers
{
    [Route("api/banhang")]
    [ApiController]
    public class BanHangController : ControllerBase
    {
        private readonly IKhachHangService _khachHangService;
        private readonly IDonHangService _donHangService;
        private readonly IChiTietDonHangService _chiTietDonHangService;

        public BanHangController(IKhachHangService khachHangService, IDonHangService donHangService, IChiTietDonHangService chiTietDonHangService)
        {
            _khachHangService = khachHangService;
            _donHangService = donHangService;
            _chiTietDonHangService = chiTietDonHangService;
        }
        [HttpGet("getDonHang")]
        public async Task<object> getSP()
        {
            try
            {
                var results = await _donHangService.getAll();
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("banHang")]
        public async Task<IActionResult> BanHang([FromBody] BanHangRequest request)
        {
            try
            {
                // Thêm khách hàng
                KhachHangDTO khachHang = new KhachHangDTO
                {
                    tenKhachHang = request.tenKhachHang,
                    soDienThoai = request.soDienThoai
                };
                int idkh = await _khachHangService.AddKhachHang(khachHang);

                // Thêm đơn hàng
                DonHangDTO donHang = new DonHangDTO
                {
                    ngayDat = request.ngayDat,
                    idKhachHang = idkh, 
                    tongTien = request.tongTien,
                    soLuong = request.soLuong,

                };
                int idDonHang = await _donHangService.AddDonHang(donHang);

                // Thêm chi tiết đơn hàng
                foreach (var chiTiet in request.chiTietDonHangs)
                {
                    ChiTietDonHangDTO chiTietDonHang = new ChiTietDonHangDTO
                    {
                        idDonHang = idDonHang,
                        idSanPham = chiTiet.idSanPham,
                        soLuong = chiTiet.soLuong,
                        gia = chiTiet.gia
                    };
                    await _chiTietDonHangService.AddChiTietDonHang(chiTietDonHang);
                }

                return Ok("Đã thêm đơn hàng và chi tiết đơn hàng thành công!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi khi thêm đơn hàng và chi tiết đơn hàng: " + ex.Message);
            }
        }
    }

    public class BanHangRequest
    {
        public string tenKhachHang { get; set; }
        public string soDienThoai { get; set; }
        public DateTime ngayDat { get; set; }
        public int tongTien { get; set; }
        public int soLuong { get; set; }
        public ChiTietDonHangDTO[] chiTietDonHangs { get; set; }
    }
}
