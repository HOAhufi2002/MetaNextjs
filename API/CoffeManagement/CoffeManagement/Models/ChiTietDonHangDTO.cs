using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class ChiTietDonHangDTO
    {
        public string tenSanPham { get; set; }
        public int idDonHang { get; set; }
        public int idSanPham { get; set; }
        public int soLuong { get; set; }
        public int gia { get; set; }
    }
}
