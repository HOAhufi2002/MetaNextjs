'use client'
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Image from 'next/image';
import profilePic from './logo.png'
import { ImageListItem } from '@mui/material';

const MainListItems: React.FC = () => (
  <React.Fragment>
    <style jsx>{`
      .listItems {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 240px; /* Set the width of the menu */
        background-color: black;
        padding: 20px;
        overflow-y: auto;
      }
      
      .listItems a {
        color: white; /* Thay đổi màu chữ thành trắng */
        text-decoration: none; /* Bỏ gạch dưới của chữ */
      }

      .listItems a:hover {
        color: lightgray; /* Thay đổi màu chữ khi di chuột qua */
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
      <a href="/pages/sanPham">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Sản Phẩm" />
        </ListItemButton>
      </a>

      <a href="/pages/loaiSanPham">
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Loại Sản Phẩm" />
        </ListItemButton>
      </a>

      <a href="/pages/banHang">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Bán hàng" />
        </ListItemButton>
      </a>

      <a href="/pages/donHang">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Lịch sử đặt hàng" />
        </ListItemButton>
      </a>

      <a href="/pages/thongKeTheoNgay">
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon style={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Thống Kê Theo Ngày" />
        </ListItemButton>
      </a>
      <a href="/pages/thongKeTheoTen">
  <ListItemButton style={{ color: 'white' }}>
    <ListItemIcon style={{ color: 'white' }}>
      <LayersIcon style={{ color: 'white' }}/>
    </ListItemIcon>
    <ListItemText primary="Thống Kê Theo Ngày Tên" />
  </ListItemButton>
</a>

    </div>
  </React.Fragment>
);

export default MainListItems;
