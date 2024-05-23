using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Models
{
    public class LoaiSanPhamDTO
    {
        public int idLoai { get; set; }
        public string tenLoai { get; set; }
        public Boolean isDelete { get; set; }
    }
}
