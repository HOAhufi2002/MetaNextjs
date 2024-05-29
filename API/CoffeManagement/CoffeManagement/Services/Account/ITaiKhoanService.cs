using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.Account
{
    public interface ITaiKhoanService
    {
        Task<IEnumerable<UserDTO>> getAlluser();
        Task AddUser(UserDTO user);
        Task<bool> CheckExistAccount(string tenDangNhap);
    }
}
