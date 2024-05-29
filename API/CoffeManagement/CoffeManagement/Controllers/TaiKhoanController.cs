using CoffeManagement.Models;
using CoffeManagement.Services.Account;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Controllers
{
    [Route("api/taikhoan")]
    [ApiController]
    public class TaiKhoanController : Controller
    {
        private readonly ITaiKhoanService _service;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public TaiKhoanController(ITaiKhoanService sanpService, IConfiguration configuration)
        {
            _service = sanpService;
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        [HttpGet("getTK")]
        public async Task<object> getSP()
        {
            try
            {
                var results = await _service.getAlluser();
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("addUser")]
        public async Task<ActionResult> addTaiKhoan(UserDTO user)
        {
            await _service.AddUser(user);
            return Ok();
        }

        [HttpGet("CheckExistAccount")]
        public async Task<ActionResult<bool>> CheckExistAccount([FromQuery] string tenDangNhap)
        {
            try
            {
                bool result = await _service.CheckExistAccount(tenDangNhap);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
