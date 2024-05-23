using CoffeManagement.Models;
using CoffeManagement.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Controllers
{
    [Route("api/sanpham")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly ISanPhamService _service;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SanPhamController(ISanPhamService sanpService, IConfiguration configuration)
        {
            _service = sanpService;
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        [HttpGet("getSP")]
        public async Task<object> getSP(string searchKeyword)
        {
            try
            {
                var results = await _service.getAllSP(searchKeyword);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("addSP")]
        public async Task<ActionResult> AddSanPham(SanPhamDTO sanPham)
        {
            await _service.AddSanPham(sanPham);
            return Ok();
        }

        [HttpPut("Update_Product{id}")]
        public async Task<IActionResult> UpdateSanPham(SanPhamDTO sanPham)
        {
     
            try
            {
                await _service.UpdateSanPham(sanPham);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("Delete_Product{id}")]
        public async Task<ActionResult> DeleteSanPham(int id)
        {
            await _service.DeleteSanPham(id);   
            return Ok();
        }
    }
}
