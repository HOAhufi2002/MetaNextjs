'use client'
import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Card, CardHeader, CardContent, TablePagination } from '@mui/material';
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
    setCurrentPage(1); // Reset current page when performing a new search
    fetchDataAndUpdateState(value);
  };

  const fetchDataAndUpdateState = async (searchValue?: string) => {
    setIsLoading(true);
    try {
      const searchData = await fetchData(searchValue || searchKeyword);
      setData(searchData);
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

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex).map((row, index) => (
      <TableRow key={row.idSanPham} style={{ borderBottom: index === pageSize - 1 ? 'none' : '1px solid #ddd' }}>
        <TableCell>{row.tenSanPham}</TableCell>
        <TableCell>{row.gia}</TableCell>
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
    ));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearch(value); // Call the search function with the new keyword
  };

  return (
    <div>
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

        <CardContent>
          <div className="kt-form">
            <div className="kt-form__filtration">
              <div className="row align-items-center">
                <div className="col-md-3 kt-margin-bottom-10-mobile">
                  <Space.Compact >
                    <Search
                      placeholder="Tìm kiếm"
                      onChange={handleChange}
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
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Sản Phẩm</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Giá</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Thao Tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderData()}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(event, newPage) => handleChangePage(newPage + 1)}
            onRowsPerPageChange={(event) => {
              setPageSize(parseInt(event.target.value, 5));
              setCurrentPage(1); // Reset current page when changing page size
            }}
          />
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

