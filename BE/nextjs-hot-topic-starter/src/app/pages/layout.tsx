'use client'
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/antd.registry';
import MainListItems from '../component/menu/mainMenu';
import handleLogout from '../auth/dangnhap/page';
import { textAlign } from '@mui/system';

const inter = Inter({ subsets: ['latin'] });

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = 'http://localhost:3000/auth/dangnhap';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []); 

  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ color: 'white', flex: 1.5 }}>
            <div>
              <MainListItems />
            </div>
          </div>
          <div style={{ flex: 8.5 }}>
  <div style={{textAlign : 'right'}}>        <p >Welcome, {username ? username : "Guest"}</p>
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button></div>


            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
          </div>
        </div>
      </body>
    </html>
  )
}
