'use client'
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/antd.registry';
import MainListItems from '../component/menu/mainMenu';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons library

const inter = Inter({ subsets: ['latin'] });

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
        setIsLoading(false); // Set isLoading to false once username is found
      } else {
        setIsLoading(false); // Set isLoading to false if username is not found
      }
    }
  }, []); 

  // If still loading, show nothing
  if (isLoading) return null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ color: 'white', flex: 1.5 }}>
            <MainListItems />
          </div>
          <div style={{ flex: 8.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative' }}>
                <p style={{ margin: 0, marginRight: '10px', cursor: 'pointer', marginTop: '20px' }} onClick={toggleMenu}>
                  <FaUser style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Welcome, {username ? username : "Guest"}
                </p>
                {menuOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 999 }}>
                    <div style={{ background: '#fff', borderRadius: '5px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '10px', minWidth: '150px' }}>
                      <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
                        <button className="btn btn-outline-primary logout-btn" onClick={handleLogout} style={{ width: '100%', borderRadius: '5px', padding: '8px', border: 'none', cursor: 'pointer', backgroundColor: 'red', color: '#fff' }}>
                          Logout
                        </button>
                        <button className="btn btn-outline-primary change-info-btn" style={{ width: '100%', borderRadius: '5px', padding: '8px', border: 'none', cursor: 'pointer' }}>
                          Change Info
                        </button>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <br />
            <hr />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
