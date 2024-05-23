'use client'
import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Card, CardHeader, CardContent } from '@mui/material';
import { EditOutlined, DeleteOutlined, AddOutlined } from '@mui/icons-material';
import AddProductForm from '../../../component/loaiSanPhamcomponent/action-component/AddProductForm';
import EditProductForm from '../../../component/loaiSanPhamcomponent/action-component/EditProductForm';
import { fetchDataLoai ,addProductloai,deleteProductloai} from '../../../component/loaiSanPhamcomponent/services/services';
import { Item } from '../../../component/loaiSanPhamcomponent/modelType/loaiSPmodel';
import { Input } from 'antd';
import { Space } from 'antd';

const MyComponentLSP = () => {
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




  return (
<div >
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
    <hr></hr>
    <CardContent>
          <div className="kt-form">
            <div className="kt-form__filtration">
              <div className="row align-items-center">
                <div className="col-md-3 kt-margin-bottom-10-mobile">
                  < Space.Compact>
                    <Search
                      placeholder="Tìm kiếm"
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

              <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Loại</TableCell>
       
              <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((a) => (
              <TableRow key={a.idLoai}>
                <TableCell>{a.tenLoai}</TableCell>
               
                <TableCell>
                <DeleteOutlined
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDelete(a.idLoai)} /> 
                    <EditOutlined style={{ color: 'blue', marginLeft: 8, cursor: 'pointer' }} />
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
