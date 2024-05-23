using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class DonHangDTO
    {
        public int idDonHang { get; set; }
        public DateTime ngayDat { get; set; }
        public int idKhachHang { get; set; }
        public string soDienThoai { get; set; }
        public string tenKhachHang { get; set; }
        public int tongTien { get; set; }
        public bool isDelete { get; set; }
        public int idNguoiDung { get; set; }
        public int soLuong { get; set; }
    }
}
