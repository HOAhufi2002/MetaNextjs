using CoffeManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.KhachHang
{
    public interface IKhachHangRepository
    {
        Task<int> AddKhachHang(KhachHangDTO khachHang);
        
    }
}
