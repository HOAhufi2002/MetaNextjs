'use client'
import React, { useState, useEffect } from 'react';
import { CardContent, TableContainer, Table, Button, TableHead, TableBody, TableRow, TableCell, Card, CardHeader } from '@mui/material';
import { fetchData } from '../services/services';
import { User } from '../modelType/userModel';
import { Input, message } from 'antd';
import { Space } from 'antd';
import { TablePagination } from '@mui/material';
import { EditOutlined, DeleteOutlined, AddOutlined } from '@mui/icons-material';
import AddUserForm from './AddUserForm'; // Update the path to AddUserForm
import { Modal } from 'antd';

const MyComponentThongKeTheoTen = () => {
  const { Search } = Input;
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    setIsLoading(true);
    try {
      const responseData = await fetchData();
      setData(responseData);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddUserClick = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddUserSuccess = () => {
    message.success('Thêm người dùng thành công');
    fetchDataUser(); // Load lại dữ liệu
    handleCloseAddForm(); // Đóng modal
  };

  return (
    <div>
      <div style={{ borderRadius: 0, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}>
        <CardHeader
          title={<span className="card-label">Danh Mục Tài Khoản</span>}
          action={
            <div className="card-toolbar">
              <Button variant="contained" onClick={handleAddUserClick}>Thêm Tài Khoản</Button>
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
                      style={{ width: '100%' }}
                    />
                  </Space.Compact>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Khách Hàng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Số Điện Thoại</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Ngày Sinh</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Địa Chỉ</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Giới Tính</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Đăng Nhập</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Mật Khẩu</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Nhóm Quyền</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.hoTen}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.soDienThoai}</TableCell>
                  <TableCell>{new Date(row.ngaySinh).toLocaleDateString()}</TableCell>
                  <TableCell>{row.diaChi}</TableCell>
                  <TableCell>{row.gioiTinh}</TableCell>
                  <TableCell>{row.tenDangNhap}</TableCell>
                  <TableCell>{row.matKhau}</TableCell>
                  <TableCell>{row.tenNhomQuyen}</TableCell>
                  <TableCell>
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                    <EditOutlined style={{ color: 'blue', marginLeft: 8, cursor: 'pointer' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </CardContent>

      <Modal
        title="Thêm người dùng"
        visible={showAddForm}
        onCancel={handleCloseAddForm}
        footer={null}
      >
        <AddUserForm onClose={handleAddUserSuccess} />
      </Modal>
    </div>
  );
};

export default MyComponentThongKeTheoTen;
