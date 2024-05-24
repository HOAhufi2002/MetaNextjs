'use client'
import React, { useState } from 'react';
import { message } from 'antd';
import { dangNhap } from './[auth]/dangnhap/service'; // Import hàm dangNhap từ file service
import './style.css'; // Import CSS file

const LoginForm = () => {
  const [error, setError] = useState('');

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => { // Explicitly define type for event parameter
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const result = await dangNhap(username, password);
  
      if (result.message === "Đăng nhập thành công" && result.roleName) {
        message.success(`Bạn đã đăng nhập thành công với vai trò ${result.roleName}`);
        window.location.href = '/pages/banHang';
        localStorage.setItem('username', username);
        localStorage.setItem('roleName', result.roleName); // Lưu thêm roleName vào localStorage
        console.log(result)

      } else {
        message.error('Đăng nhập không thành công. Vui lòng thử lại.');
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Đăng nhập không thành công:', error);
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };  

  return (
    <div>
    
      <form onSubmit={onFinish} className="login-form">
        <div className="form-field">
          <input type="text" name="username" placeholder="Email / Username" required />
        </div>
        
        <div className="form-field">
        <input type="password" placeholder="Password" required name="password" autoComplete="current-password" />
        </div>
        
        <div className="form-field">
          <button className="btn" type="submit">Log in</button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

    </div>
  );
};

export default LoginForm;
