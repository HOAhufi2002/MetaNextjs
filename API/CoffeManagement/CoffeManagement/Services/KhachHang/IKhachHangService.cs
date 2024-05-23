using CoffeManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoffeManagement.Services.KhachHang
{
    public interface IKhachHangService
    {
        Task<int> AddKhachHang(KhachHangDTO khachHang);
      
    }
}
