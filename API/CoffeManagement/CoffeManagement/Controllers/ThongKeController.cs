using CoffeManagement.Models;
using CoffeManagement.Services.ThongKe;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Controllers
{
    [Route("api/thongke")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private readonly IThongKeService _service;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public ThongKeController(IThongKeService sanpService, IConfiguration configuration)
        {
            _service = sanpService;
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        [HttpGet("theoten")]
        public async Task<ActionResult<IEnumerable<ThongKeDTO>>> ThongKeTheoTen()
        {
            try
            {
                var result = await _service.ThongKeTheoTen();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }

        // Endpoint để thực hiện thống kê theo ngày đặt hàng
        [HttpGet("theongay")]
        public async Task<ActionResult<IEnumerable<ThongKeDTO>>> ThongKeTheoNgay()
        {
            try
            {
                var result = await _service.ThongKeTheoNgay();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }
    }
}
