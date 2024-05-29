using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.Account
{
    public interface ITaiKhoanRepository
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
        Task AddUser(UserDTO user);
        Task<bool> CheckExistAccount(string tenDangNhap);
    }
}
