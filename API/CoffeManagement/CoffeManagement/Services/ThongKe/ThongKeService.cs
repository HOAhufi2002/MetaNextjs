using CoffeManagement.Models;
using CoffeManagement.Repositories.ThongKe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.ThongKe
{
    public class ThongKeService : IThongKeService
    {
        private IThongKeRepository _reposiory;

        public ThongKeService(IThongKeRepository ThongKeRepository)
        {
            _reposiory = ThongKeRepository;
        }
        public async Task<IEnumerable<ThongKeDTO>> ThongKeTheoNgay()
        {
            return await _reposiory.ThongKeTheoNgay();
        }
        public async Task<IEnumerable<ThongKeDTO>> ThongKeTheoTen()
        {
            return await _reposiory.ThongKeTheoTen();
        }
    }
}
