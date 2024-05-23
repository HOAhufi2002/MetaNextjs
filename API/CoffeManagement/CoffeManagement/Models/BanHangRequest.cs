using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class BanHangRequest
    {
        public string tenKhachHang { get; set; }
        public string soDienThoai { get; set; }
        public DateTime ngaymua { get; set; }
        public List<int> idSanPham { get; set; }
        public int soLuong { get; set; }
        public int tongTien { get; set; }
    }
}
