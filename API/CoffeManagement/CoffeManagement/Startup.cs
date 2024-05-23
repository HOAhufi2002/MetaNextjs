
using CoffeManagement.Repositories.ChiTietDonHang;
using CoffeManagement.Repositories.DonHang;
using CoffeManagement.Repositories.KhachHang;
using CoffeManagement.Repositories.LoaiSanPhamRepository;
using CoffeManagement.Repositories.SanPham;
using CoffeManagement.Repositories.ThongKe;
using CoffeManagement.Services;
using CoffeManagement.Services.ChiTietDonHang;
using CoffeManagement.Services.DonHang;
using CoffeManagement.Services.KhachHang;
using CoffeManagement.Services.LoaiSanPham;
using CoffeManagement.Services.ThongKe;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CoffeManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public class MyHttpClient
        {
            private readonly HttpClient _httpClient;


            public async Task<string> GetDefaultUrlContentAsync()
            {
                var response = await _httpClient.GetAsync("");
                return await response.Content.ReadAsStringAsync();
            }
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CoffeManagement", Version = "v1" });
            });
            services.AddMvc().ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            services.AddOptions();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });
            services.AddTransient<ISanPhamRepository, SanPhamRepository>();
            services.AddTransient<ISanPhamService,SanPhamService>();

            services.AddTransient<ILoaiSanPhamRepository, LoaiSanPhamRepository>();
            services.AddTransient<ILoaiSanPhamService, LoaiSanPhamService>();

            services.AddTransient<IDonHangRepository, DonHangRepository>();
            services.AddTransient<IDonHangService, DonHangService>();

            services.AddTransient<IChiTietDonHangRepository, ChiTietDonHangRepository>();
            services.AddTransient<IChiTietDonHangService, ChiTietDonHangService>();

            services.AddTransient<IKhachHangRepository, KhachHangRepository>();
            services.AddTransient<IKhachHangService, KhachHangService>();

            services.AddTransient<IThongKeRepository, ThongKeRepository>();
            services.AddTransient<IThongKeService, ThongKeService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CoffeManagement"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("AllowAll");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
