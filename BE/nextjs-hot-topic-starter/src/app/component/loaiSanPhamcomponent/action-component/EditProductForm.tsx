import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const EditProductForm = ({ onFinish, initialValues, categories }: { onFinish: (values: any) => void; initialValues: any; categories: any[] }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onFinish(values);
    });
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
            <Form.Item style={{ display: 'none' }} name="idSanPham" label="id sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập id sản phẩm' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="tenSanPham" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gia" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="idLoai" label="Loại sản phẩm" rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}>
        <Select placeholder="Chọn loại sản phẩm">
          {categories.map(category => (
            <Option key={category.idLoai} value={category.idLoai}>
              {category.tenLoai} - {category.idLoai}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Lưu sản phẩm</Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
