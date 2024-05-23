import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const AddProductForm = ({ onFinish, categories }: { onFinish: (values: any) => void; categories: any[] }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onFinish(values); // Gửi giá trị được nhập vào hàm onFinish từ props
  };

  return (
    <div>
      <br />
      <Form form={form} onFinish={handleSubmit}> {/*Thêm sự kiện onFinish và gọi hàm handleSubmit*/}
        <Form.Item name="tenLoai" label="Tên Loại" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm' }]}>
          <Input />
        </Form.Item>
    
        <Form.Item>
          <center>
            <Button type="primary" htmlType="submit">Thêm sản phẩm</Button>
          </center> 
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductForm;
