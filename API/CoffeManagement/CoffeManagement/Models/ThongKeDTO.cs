using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class ThongKeDTO
    {
        public string TenKhachHang { get; set; }
        public int SoLuongDonHang { get; set; }
        public int SoLuongMatHang { get; set; }
        public decimal TongTien { get; set; }
        public DateTime NgayDat { get; set; }

    }
}
