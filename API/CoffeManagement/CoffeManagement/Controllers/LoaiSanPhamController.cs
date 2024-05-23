using CoffeManagement.Models;
using CoffeManagement.Services.LoaiSanPham;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Controllers
{
    [Route("api/loaisanpham")]
    [ApiController]
    public class LoaiSanPhamController : ControllerBase
    {
        private readonly ILoaiSanPhamService _service;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public LoaiSanPhamController(ILoaiSanPhamService sanpService, IConfiguration configuration)
        {
            _service = sanpService;
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        [HttpGet("getLoai")]
        public async Task<object> getSP()
        {
            try
            {
                var results = await _service.getAllSP();
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("addloaiSP")]
        public async Task<ActionResult> AddLoaiSanPham(LoaiSanPhamDTO sanPham)
        {
            await _service.AddLoaiSanPham(sanPham);
            return Ok();
        }

        [HttpPut("Update_loaiProduct{id}")]
        public async Task<IActionResult> UpdateLoaiSanPham(LoaiSanPhamDTO sanPham)
        {


            try
            {
                await _service.UpdateLoaiSanPham(sanPham);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("Delete_loaiProduct{id}")]
        public async Task<ActionResult> DeleteLoaiSanPham(int id)
        {
            await _service.DeleteLoaiSanPham(id);
            return Ok();
        }
    }
}
