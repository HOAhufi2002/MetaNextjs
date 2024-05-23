'use client'
import React, { useState, useEffect } from 'react';
import { CardContent, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, Backdrop, Fade, Button, Card, CardHeader } from '@mui/material';
import { fetchDataTheoTen } from '../../../component/thongKecomponent/services/services';
import { Item } from '../../../component/thongKecomponent/modelType/thongKemodel';
import { Input } from 'antd';
import { Space } from 'antd';
import { TablePagination } from '@mui/material';

const MyComponentThongKeTheoTen = () => {
  const { Search } = Input;
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchDataNgay();
  }, []);

  const fetchDataNgay = async () => {
    setIsLoading(true);
    try {
      const responseData = await fetchDataTheoTen();
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

  return (
    <div>
      <CardHeader
        title={<span className="card-label">Thông Kê Theo Tên</span>}
        action={
          <div className="card-toolbar">
            <Button variant="contained" style={{ marginRight: '10px' }}>In Đơn Hàng</Button>
            <Button variant="contained">Nhập Đơn Hàng</Button>
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

      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>tên Khách Hàng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>số Lượng Đơn Hàng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Số Lượng mặt Hàng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tổng Tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.tenKhachHang}</TableCell>
                  <TableCell>{row.soLuongDonHang}</TableCell>
                  <TableCell>{row.soLuongMatHang}</TableCell>
                  <TableCell>{row.tongTien}</TableCell>
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
    </div>
  );
};

export default MyComponentThongKeTheoTen;
