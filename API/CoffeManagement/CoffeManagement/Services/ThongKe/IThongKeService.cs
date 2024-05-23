using CoffeManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeManagement.Services.ThongKe
{
    public interface IThongKeService
    {
        Task<IEnumerable<ThongKeDTO>> ThongKeTheoNgay();
        Task<IEnumerable<ThongKeDTO>> ThongKeTheoTen();
    }
}
