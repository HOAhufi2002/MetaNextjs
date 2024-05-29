  'use client'
  import React, { useState, useEffect } from 'react';
  import { message } from 'antd';
  import { dangNhap } from './[auth]/dangnhap/service';
  import './style.css';

  const LoginForm = () => {
    const [error, setError] = useState('');
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        window.location.href = '/pages';
      }
    }, []); 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const username = (event.target as HTMLFormElement).elements.namedItem("username") as HTMLInputElement;
      const password = (event.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;

      try {
        const data = await dangNhap(username.value, password.value);
        if (data && !data.error) {

          localStorage.setItem('userId', data.userId);
          localStorage.setItem('username', data.username);
          localStorage.setItem('tenNhomQuyen', data.tenNhomQuyen);
          localStorage.setItem('token', data.token);

          console.log('Token:', data.token);
          console.log('Tên nhóm quyền:', data.tenNhomQuyen);
          console.log('Username:', data.username);
          
          window.location.href = '/pages/';
    
          message.success('Đăng nhập thành công ' + data.tenNhomQuyen);
        } else {
          setError('Đăng nhập không thành công. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    };

    return (
      <div>
        <form onSubmit={handleSubmit} className="login-form">
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
