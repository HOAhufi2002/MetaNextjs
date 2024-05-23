'use client'
import React, { useState, useEffect } from 'react';
import {CardContent,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Modal,Backdrop,Fade,Button,Card,CardHeader,} from '@mui/material';
import { fetchDataTheoTen } from '../../../component/thongKecomponent/services/services';
import { Item } from '../../../component/thongKecomponent/modelType/thongKemodel';
import { Input } from 'antd';
import { Space } from 'antd';

const MyComponentThongKeTheoTen = () => {
  const { Search } = Input;
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      <hr />
      <CardContent>
        <div className="kt-form">
          <div className="kt-form__filtration">
            <div className="row align-items-center">
              <div className="col-md-3 kt-margin-bottom-10-mobile">
                <Space.Compact >
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
              {data.map((row, index) => (
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
    
      </CardContent>
    </div>
  );
};

export default MyComponentThongKeTheoTen;
