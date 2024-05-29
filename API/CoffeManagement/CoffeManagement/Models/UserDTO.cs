using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class UserDTO
    {
        public int idDangNhap { get; set; }

        public string HoTen { get; set; }
        public string Email { get; set; }
        public string SoDienThoai { get; set; }
        public DateTime NgaySinh { get; set; }
        public string DiaChi { get; set; }
        public string GioiTinh { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public string TenNhomQuyen { get; set; }
        public int idNhomQuyen { get; set; }
    }
}
