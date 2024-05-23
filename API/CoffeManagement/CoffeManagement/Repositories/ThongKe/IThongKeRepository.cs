using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Repositories.ThongKe
{
    public interface IThongKeRepository
    {
        Task<IEnumerable<ThongKeDTO>> ThongKeTheoTen();
        Task<IEnumerable<ThongKeDTO>> ThongKeTheoNgay();
    }
}
