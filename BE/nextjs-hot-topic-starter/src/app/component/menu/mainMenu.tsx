'use client'
import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Image from 'next/image';
import profilePic from './logo.png';
import { ImageListItem } from '@mui/material';

const MainListItems: React.FC = () => {
  const [roleName, setRoleName] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('tenNhomQuyen');
    setRoleName(role);
  }, []);

  return (
    <React.Fragment>
      <style jsx>{`
        .listItems {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 240px;
          background-color: black;
          padding: 20px;
          overflow-y: auto;
        }
        
        .listItems a {
          color: white;
          text-decoration: none;
        }

        .listItems a:hover {
          color: lightgray;
        }
      `}</style>
      <div className="listItems">
        <ListItemButton>
          <ImageListItem>
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={200}
              height={50}
            />
          </ImageListItem>
          <ListItemText />
        </ListItemButton>
        <br />
        <br />
        {roleName === 'Quản Trị Viên' && (
          <>
            <a href="/pages/sanPham">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Sản Phẩm" />
              </ListItemButton>
            </a>

            <a href="/pages/loaiSanPham">
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Loại Sản Phẩm" />
              </ListItemButton>
            </a>

            <a href="/pages/banHang">
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Bán hàng" />
              </ListItemButton>
            </a>

            <a href="/pages/donHang">
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Lịch sử đặt hàng" />
              </ListItemButton>
            </a>

            <a href="/pages/thongKeTheoNgay">
              <ListItemButton>
                <ListItemIcon>
                  <LayersIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Thống Kê Theo Ngày" />
              </ListItemButton>
            </a>

            <a href="/pages/thongKeTheoTen">
              <ListItemButton style={{ color: 'white' }}>
                <ListItemIcon style={{ color: 'white' }}>
                  <LayersIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Thống Kê Theo Tên" />
              </ListItemButton>
            </a>
            <a href="/pages/taiKhoan">
              <ListItemButton style={{ color: 'white' }}>
                <ListItemIcon style={{ color: 'white' }}>
                  <LayersIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Tài Khoản" />
              </ListItemButton>
            </a>
          </>
        )}

        {roleName === 'Nhân Viên' && (
          <>
            <a href="/pages/banHang">
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Bán hàng" />
              </ListItemButton>
            </a>

            <a href="/pages/donHang">
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Lịch sử đặt hàng" />
              </ListItemButton>
            </a>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default MainListItems;
