'use client'
import React, { useState, useEffect } from 'react';
import { Modal, message, Input, Space } from 'antd';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Card, CardHeader, CardContent, TablePagination } from '@mui/material';
import { EditOutlined, DeleteOutlined, AddOutlined } from '@mui/icons-material';
import AddProductForm from '../../../component/loaiSanPhamcomponent/action-component/AddProductForm';
import EditProductForm from '../../../component/loaiSanPhamcomponent/action-component/EditProductForm';
import { fetchDataLoai ,addProductloai,deleteProductloai } from '../../../component/loaiSanPhamcomponent/services/services';
import { Item } from '../../../component/loaiSanPhamcomponent/modelType/loaiSPmodel';

const MyComponentLSP = () => {
  const { Search } = Input;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchCategoriesAndUpdateState();
  }, []);

  const handleAddProduct = async (values: any) => {
    try {
      await addProductloai(values);
      message.success('Thêm sản phẩm thành công');
      setShowAddForm(false);
      fetchCategoriesAndUpdateState();
    } catch (error) {
      message.error('Lỗi khi thêm sản phẩm');
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

  const handleDelete = async (id: number) => {
    setIdToDelete(id);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProductloai(idToDelete!);
      message.success('Sản phẩm đã được xóa thành công');
      fetchCategoriesAndUpdateState();
      setConfirmDeleteVisible(false);
    } catch (error) {
      message.error('Lỗi khi xóa sản phẩm');
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div style={{ borderRadius: 0, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}>
        <CardHeader
          title={<span className="card-label">Danh Mục Loại Sản Phẩm</span>}
          action={
            <div className="card-toolbar">
              <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => setShowAddForm(true)}>Import Dữ Liệu</Button>
              <Button variant="contained" onClick={() => setShowAddForm(true)}>Thêm Sản Phẩm</Button>
            </div>
          }
        />
        <CardContent>
          <div className="kt-form">
            <div className="kt-form__filtration">
              <div className="row align-items-center">
                <div className="col-md-3 kt-margin-bottom-10-mobile">
                  <Space.Compact>
                    <Search
                      placeholder="Tìm kiếm"
                      style={{ width: '100%' }}
                      />
                  </Space.Compact>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      <div>
        <CardContent>
          <TableContainer>
            <Table className="table table-striped table-hover">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Loại</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Thao Tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((a) => (
                  <TableRow key={a.idLoai}>
                    <TableCell>{a.tenLoai}</TableCell>
                    <TableCell>
                      <DeleteOutlined
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => handleDelete(a.idLoai)}
                      />
                      <EditOutlined style={{ color: 'blue', marginLeft: 8, cursor: 'pointer' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, 20, 50]}
              component="div"
              count={categories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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

export default MyComponentLSP;
