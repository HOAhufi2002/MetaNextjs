'use client'
import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Card, CardHeader, CardContent } from '@mui/material';
import { EditOutlined, DeleteOutlined, AddOutlined } from '@mui/icons-material';
import AddProductForm from '../../../component/sanPhamcomponent/action-component/AddProductForm';
import EditProductForm from '../../../component/sanPhamcomponent/action-component/EditProductForm';
import { fetchData, fetchDataLoai, addProduct, deleteProduct, updateProduct } from '../../../component/sanPhamcomponent/services/services';
import { Item } from '../../../component/sanPhamcomponent/modelType/types';
import { Input } from 'antd';
import { Space } from 'antd';

const ListComponent = () => {
  const { Search } = Input;

  const [searchKeyword, setSearchKeyword] = useState('');

  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Item | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    fetchDataAndUpdateState();
    fetchCategoriesAndUpdateState();
  }, []);
  const handleSearch = async (value: string) => {
    setSearchKeyword(value);

    try {
      const searchData = await fetchData(value);
      setData(searchData);
    } catch (error) {
      setError('Error fetching data');
    }
  };
  const fetchDataAndUpdateState = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setIsLoading(false);
    }
  };

  const fetchCategoriesAndUpdateState = async () => {
    try {
      const categories = await fetchDataLoai();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = async (values: any) => {
    try {
      await addProduct(values);
      message.success('Thêm sản phẩm thành công');
      setShowAddForm(false);
      fetchDataAndUpdateState();
    } catch (error) {
      message.error('Lỗi khi thêm sản phẩm');
    }
  };

  const handleDelete = async (id: number) => {
    setIdToDelete(id);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(idToDelete!);
      message.success('Sản phẩm đã được xóa thành công');
      fetchDataAndUpdateState();
      setConfirmDeleteVisible(false);
    } catch (error) {
      message.error('Lỗi khi xóa sản phẩm');
    }
  };

  const handleUpdate = async (id: number, updatedProduct: Item) => {
    try {
      await updateProduct(id, updatedProduct);
      message.success('Sản phẩm đã được cập nhật thành công');
      fetchDataAndUpdateState();
    } catch (error) {
      message.error('Lỗi khi cập nhật sản phẩm');
    }
  };

  const handleEdit = (record: Item) => {
    setEditingProduct(record);
  };

  const handleSaveEdit = async (values: any) => {
    try {
      await handleUpdate(editingProduct!.idSanPham, values);
      setEditingProduct(null);
    } catch (error) {
      message.error('Lỗi khi cập nhật sản phẩm');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearch(value); // Gọi hàm xử lý tìm kiếm với từ khóa mới
  };
  return (
<div >
  <div style={{ borderRadius: 0, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}>
    <CardHeader
      title={<span className="card-label">Danh Mục Sản Phẩm</span>}
      action={
        <div className="card-toolbar">
          <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => setShowAddForm(true)}>Import Dữ Liệu</Button>
          <Button variant="contained" onClick={() => setShowAddForm(true)}>Thêm Sản Phẩm</Button>
        </div>
      }
    />
    <hr></hr>
    <CardContent>
          <div className="kt-form">
            <div className="kt-form__filtration">
              <div className="row align-items-center">
                <div className="col-md-3 kt-margin-bottom-10-mobile">
                  <Space.Compact >
                    <Search
                      placeholder="Tìm kiếm"
                      onChange={handleChange} // Gọi hàm xử lý khi nội dung thay đổi
                      style={{ width: '20%' }}
                    />
                  </Space.Compact>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

  </div>

  <div >
    <CardContent>
      <TableContainer>
        <Table className="table table-striped table-hover">
          <TableHead>
            <TableRow>

              <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Sản Phẩm</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Giá</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (               

              <TableRow key={row.idSanPham} style={{ borderBottom: index === data.length - 1 ? 'none' : '1px solid #ddd' }}>
                 <TableCell style={{ display: 'none' }}>{row.idSanPham}</TableCell>
                <TableCell>{row.tenSanPham}</TableCell>
                <TableCell>{row.gia}</TableCell>
                <TableCell style={{ display: 'none' }}>{row.idLoai}</TableCell>
                <TableCell>
                  <DeleteOutlined
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDelete(row.idSanPham)}
                  />
                  <EditOutlined
                    style={{ color: 'blue', marginLeft: 8, cursor: 'pointer' }}
                    onClick={() => handleEdit(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        title="Thêm sản phẩm mới"
        visible={showAddForm}
        onCancel={() => setShowAddForm(false)}
        footer={null}
      >
        <AddProductForm onFinish={handleAddProduct} categories={categories} />
      </Modal>
      <Modal
        title="Xác nhận xóa sản phẩm"
        visible={confirmDeleteVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmDeleteVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
      {editingProduct && (
        <Modal
          title="Chỉnh sửa sản phẩm"
          visible={!!editingProduct}
          onCancel={() => setEditingProduct(null)}
          footer={null}
        >
          <EditProductForm
            onFinish={handleSaveEdit}
            initialValues={editingProduct}
            categories={categories}
          />
        </Modal>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : null}
    </CardContent>
  </div>
</div>

  );
};

export default ListComponent;
