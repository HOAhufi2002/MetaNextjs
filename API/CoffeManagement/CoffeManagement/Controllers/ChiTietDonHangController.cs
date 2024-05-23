using CoffeManagement.Models;
using CoffeManagement.Services.ChiTietDonHang;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietDonHangController : ControllerBase
    {
        private readonly IChiTietDonHangService _chiTietDonHangService;

        public ChiTietDonHangController(IChiTietDonHangService chiTietDonHangService)
        {
            _chiTietDonHangService = chiTietDonHangService;
        }

        // GET: api/ChiTietDonHang/idDonHang
        [HttpGet("{idDonHang}")]
        public async Task<ActionResult<List<ChiTietDonHangDTO>>> GetChiTietDonHang(int idDonHang)
        {
            try
            {
                var chiTietDonHang = await _chiTietDonHangService.GetChiTietDonHang(idDonHang);
                if (chiTietDonHang == null)
                {
                    return NotFound();
                }
                return chiTietDonHang;
            }
            catch (Exception ex)
            {
                // Xử lý các lỗi ngoại lệ ở đây
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
