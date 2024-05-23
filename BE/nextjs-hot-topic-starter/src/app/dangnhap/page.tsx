'use client'
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { dangNhap } from './service'; // Import hàm dangNhap từ file service
import './style.css'; // Import CSS file

const LoginForm = () => {
  const [error, setError] = useState('');

  const onFinish = async (values: any) => {
    try {
      const { username, password } = values;
      const result = await dangNhap(username, password);
  
        if (result.message === "Đăng nhập thành công" && result.role) {
        message.success(`Bạn đã đăng nhập thành công với vai trò ${result.role}`);
  
        window.location.href = '/pages/donHang';
      } else {
        message.error('Đăng nhập không thành công. Vui lòng thử lại.');
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Đăng nhập không thành công:', error);
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
  
      // Display an error notification for unexpected errors during login
      message.error('Đăng nhập không thành công. Vui lòng thử lại.');
    }
  };
  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="form-container"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      {error && <p>{error}</p>}
    </Form>
  );
};

export default LoginForm;
