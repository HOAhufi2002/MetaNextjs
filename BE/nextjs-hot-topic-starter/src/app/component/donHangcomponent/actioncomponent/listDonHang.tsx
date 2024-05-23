'use client'
import React, { useState, useEffect, useRef, RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Backdrop,
  Fade,
  Button,
  Card,
  CardHeader,
} from '@mui/material';
import { fetchDonHang, fetchDonHangChiTiet } from '../../../component/donHangcomponent/services/services';
import { ListDonHang } from '../../../component/donHangcomponent/modelType/listDonHangModel';
import { Input } from 'antd';

interface InvoiceDetailProps {
  selectedDonHang: any;
  selectedChiTiet: any;
}

const InvoiceDetail = React.forwardRef<HTMLDivElement, InvoiceDetailProps>((props: InvoiceDetailProps, ref) => {
  const { selectedDonHang, selectedChiTiet } = props;

  return (
    <div ref={ref} style={{ fontSize: '10px' }}>
    <h2 style={{ textAlign: 'center' }}>Chi tiết hóa đơn</h2>
    <h3 style={{ textAlign: 'center' }}>Tên cửa hàng : Quán Cafe DPS Hồ Chí Minh</h3>
    <h4 style={{ textAlign: 'center' }}>Địa chỉ : 78 Tân Sơn Nhì , Tân Phú , Thành Phố Hồ Chí Minh</h4>
    {selectedDonHang && (
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <p><strong>Tên khách hàng:</strong> {selectedDonHang.tenKhachHang}</p>
        <p><strong>Số điện thoại:</strong> {selectedDonHang.soDienThoai}</p>
        <p><strong>Ngày Đặt:</strong> {new Date().toLocaleString()}</p>

      </div>
    )}

    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tên sản phẩm</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Số lượng</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Giá</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Thành Tiền</th>
        </tr>
      </thead>
      <tbody>
        {selectedChiTiet && selectedChiTiet.map((item: any, index: number) => (
          <tr key={index}>
            
            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.tenSanPham}</td>
            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.soLuong}</td>
            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.gia.toLocaleString()}</td>
            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{(item.gia * item.soLuong).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedDonHang && (
      <div style={{ textAlign: 'right', marginRight: '30px', marginBottom: '20px' }}>
        <p><strong>Tổng Tiền:</strong> {selectedDonHang.tongTien.toLocaleString()}</p>
      </div>
    )}

    <center><p style={{ fontSize: '10px' }}><strong>passwifi:</strong> 1234567890123</p></center>
    <center><p style={{ fontSize: '10px' }}>Xin cảm ơn và hẹn gặp lại quý khách</p></center>
  </div>
  );
});

const MyComponentDonHang = () => {
  const { Search } = Input;
  const [data, setData] = useState<ListDonHang[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDonHang, setSelectedDonHang] = useState<any>(null);
  const [selectedChiTiet, setSelectedChiTiet] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null); // Sửa đổi kiểu của useRef

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const responseData = await fetchDonHang();
      setData(responseData);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = async (donHang: ListDonHang) => {
    try {
      setSelectedDonHang(donHang);
      const responseData = await fetchDonHangChiTiet(donHang.idDonHang);
      setSelectedChiTiet(responseData);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <CardHeader
        title={<span className="card-label">Danh Mục Lịch Sử Đặt Hàng</span>}
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
                <Input.Group >
                  <Search
                    placeholder="Tìm kiếm"
                    style={{ width: '20%' }}
                  />
                </Input.Group>
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
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Khách Hàng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Số Điện Thoại</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Ngày Đặt</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tổng Tiền</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Số Lượng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Id Người Dùng</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Chi Tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.tenKhachHang}</TableCell>
                  <TableCell>{row.soDienThoai}</TableCell>
                  <TableCell>{new Date(row.ngayDat).toLocaleString()}</TableCell>
                  <TableCell>{row.tongTien}</TableCell>
                  <TableCell>{row.soLuong}</TableCell>
                  <TableCell>{row.idNguoiDung}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(row)}>Chi Tiết</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <InvoiceDetail
                  selectedDonHang={selectedDonHang}
                  selectedChiTiet={selectedChiTiet}
                  ref={componentRef}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button onClick={handleClose} variant="contained" color="primary" style={{ marginRight: '10px' }}>Đóng</Button>
                  <Button onClick={handlePrint} variant="contained" color="primary">In Hóa Đơn</Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </CardContent>
    </div>
  );
};

export default MyComponentDonHang;
