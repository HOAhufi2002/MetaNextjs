using CoffeManagement.Models;
using CoffeManagement.Repositories.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.Account
{
    public class TaiKhoanService : ITaiKhoanService
    {
        private ITaiKhoanRepository _reposiory;
        public TaiKhoanService(ITaiKhoanRepository TaiKhoanRepository)
        {
            _reposiory = TaiKhoanRepository;
        }
        public async Task<IEnumerable<UserDTO>> getAlluser()
        {
            return await _reposiory.GetAllUsers();
        }
        public async Task AddUser(UserDTO user)
        {
             await _reposiory.AddUser(user);

        }
        public async Task<bool> CheckExistAccount(string tenDangNhap)
        {
            return await _reposiory.CheckExistAccount(tenDangNhap);
        }
    }
}
