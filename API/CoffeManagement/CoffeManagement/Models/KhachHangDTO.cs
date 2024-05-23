using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class KhachHangDTO
    {
        public int idKhachHang { get; set; }
        public string tenKhachHang { get; set; }
        public string soDienThoai { get; set; }
        public bool isDelete { get; set; }
    }
}
