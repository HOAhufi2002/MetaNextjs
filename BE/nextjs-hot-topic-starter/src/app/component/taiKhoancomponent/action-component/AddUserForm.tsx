'use client'
import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import { User } from '../modelType/userModel';
import { addUser, fetchData } from '../services/services'; // Import fetchData
import { CloseOutlined } from '@mui/icons-material';
import { message } from 'antd';

const { Option } = Select;


interface AddUserFormProps {
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = React.useState<string[]>([]); // State to store usernames

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchData(); // Call fetchData to get user data
        const usernames = data.map((user: any) => user.tenDangNhap); // Extract usernames
        console.log(usernames); // Console.log usernames here
        setUsers(usernames); // Set usernames to state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUsers();
  }, []); // Call only once when component mounts
  
  const handleSubmit = async (values: any) => {
    const user: User = {
      idDangNhap: 0,
      hoTen: values.hoTen,
      email: values.email,
      soDienThoai: values.soDienThoai,
      ngaySinh: values.ngaySinh.toDate(),
      diaChi: values.diaChi,
      gioiTinh: values.gioiTinh,
      tenDangNhap: values.tenDangNhap,
      matKhau: values.matKhau,
      tenNhomQuyen: '',
      idNhomQuyen: values.idNhomQuyen,
    };
    const username = values.tenDangNhap;
    if (users.includes(username)) {
      message.error('Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác.');
      return;
    }
    if (user.tenDangNhap.length < 5 || user.tenDangNhap.length > 30) {
      message.error('Tên đăng nhập phải có ít nhất 10 ký tự và tối đa 30 ký tự');
      return;
    }
  
    try {
      await addUser(user);
      form.resetFields();
      onClose();
    } catch (error) {
      // Xử lý lỗi khi thêm người dùng
      console.error(error);
    }
  };
  

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Họ Tên" name="hoTen" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input type="email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Số Điện Thoại" name="soDienThoai" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Ngày Sinh" name="ngaySinh" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Địa Chỉ" name="diaChi" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Giới Tính" name="gioiTinh" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
            <Select placeholder="Chọn giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tên Đăng Nhập" name="tenDangNhap" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Mật Khẩu" name="matKhau" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
        <Form.Item label="ID Nhóm Quyền" name="idNhomQuyen" rules={[{ required: true, message: 'Vui lòng chọn nhóm quyền' }]}>
  <Select placeholder="Chọn nhóm quyền">
    <Option value={1}>Quản Trị Viên</Option>
    <Option value={2}>Nhân Viên</Option>
  </Select>
</Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">Thêm người dùng</Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
