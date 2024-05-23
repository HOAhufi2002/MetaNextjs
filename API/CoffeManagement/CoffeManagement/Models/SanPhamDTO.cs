using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class SanPhamDTO
    {
        public int idSanPham { get; set; }
        public string tenSanPham { get; set; }
        public decimal gia { get; set; }
        public int idLoai { get; set; }
        public Boolean isDelete { get; set; }
    }
}
