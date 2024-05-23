'use client'
import React, { useState, useEffect } from 'react';
import { CardHeader, CardContent, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, TextField,IconButton } from '@mui/material';
import { fetchData, addBill } from '../../component/banHangcomponent/services/services';
import { Item } from '../../component/banHangcomponent/modelType/donHangModel';
import { message } from 'antd';

import AddIcon  from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const MyComponent = () => {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState({ tenKhachHang: '', soDienThoai: '' });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Item[]>([]);
  const [productQuantities, setProductQuantities] = useState<any>({});

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

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

  const handleCheckboxChange = (idSanPham: number) => {
    const newProductQuantities = { ...productQuantities, [idSanPham]: productQuantities[idSanPham] || 1 };
    setProductQuantities(newProductQuantities);
    calculateTotalPrice(newProductQuantities);
  };

  const handleBuyProduct = () => {
    setShowAddForm(true);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    const newProductQuantities = { ...productQuantities, [productId]: quantity };
    setProductQuantities(newProductQuantities);
    calculateTotalPrice(newProductQuantities);
  };

  const calculateTotalPrice = (newProductQuantities: { [productId: string]: number }) => {
    const totalPrice = Object.keys(newProductQuantities).reduce((acc: number, productIdStr: string) => {
      const productId = parseInt(productIdStr);
      const product = data.find(item => item.idSanPham.toString() === productIdStr);
      if (product) {
        return acc + (newProductQuantities[productId] || 1) * product.gia;
      }
      return acc;
    }, 0);
    setTotalPrice(totalPrice);
  };
  
  
  const handleSaveCustomerInfo = async () => {
    try {
      const totalQuantity = Object.values<number>(productQuantities).reduce((acc, quantity) => acc + quantity, 0);

      const billData = {
        tenKhachHang: customerInfo.tenKhachHang,
        soDienThoai: customerInfo.soDienThoai,
        ngayDat: new Date(),
        soLuong: totalQuantity,
        tongTien: totalPrice,
        chiTietDonHangs: Object.keys(productQuantities).map(productId => ({
          soLuong: productQuantities[productId] || 1,
          idSanPham: parseInt(productId),
          gia: data.find(item => item.idSanPham.toString() === productId)?.gia || 0,
        })),
      };
  
      await addBill(billData);
  
      setShowAddForm(false);
      setCustomerInfo({ tenKhachHang: '', soDienThoai: '' });
      setProductQuantities({});
      // Display success message
      message.success('Đã thêm đơn hàng thành công!');
    } catch (error) {
      // Handle error
      message.error('Đã xảy ra lỗi khi thêm đơn hàng!');
    }
  };
  
  return (
    <div>
      <div>
        <CardHeader
          title={<span className="card-label">Danh Mục Bán Hàng</span>}
          action={
            <div className="card-toolbar">
              <Button variant="contained" onClick={handleBuyProduct}>Mua Sản Phẩm</Button>
            </div>
          }
        />
        <CardContent>
          <TableContainer>
            <Table className="table table-striped table-hover">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Tên Sản Phẩm</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Giá</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: 'green' }}>Số Lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.idSanPham} style={{ borderBottom: index === data.length - 1 ? 'none' : '1px solid #ddd' }}>
                    <TableCell>{row.tenSanPham}</TableCell>
                    <TableCell>{row.gia}</TableCell>
                    <TableCell>
                      <div className="quantity-controls">
                        <IconButton onClick={() => handleQuantityChange(row.idSanPham, (productQuantities[row.idSanPham] || 1) - 1)}>
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={productQuantities[row.idSanPham] || ''}
                          onChange={(e) => handleQuantityChange(row.idSanPham, parseInt(e.target.value))}
                          InputProps={{ disableUnderline: true, style: { width: '50px' , height :'50px', textAlign: 'center' } }}
                        />
                        <IconButton onClick={() => handleQuantityChange(row.idSanPham, (productQuantities[row.idSanPham] || 1) + 1)}>
                          <AddIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : null}
        </CardContent>
      </div>

      <Modal open={showAddForm} onClose={() => setShowAddForm(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
          <h2>Thông tin khách hàng</h2>
          <TextField
            label="Tên Khách Hàng"
            name="tenKhachHang"
            value={customerInfo.tenKhachHang}
            onChange={(e) => setCustomerInfo({ ...customerInfo, tenKhachHang: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số Điện Thoại"
            name="soDienThoai"
            value={customerInfo.soDienThoai}
            onChange={(e) => setCustomerInfo({ ...customerInfo, soDienThoai: e.target.value })}
            fullWidth
            margin="normal"
          />
          <div>
            <h3>Danh sách sản phẩm đã chọn:</h3>
            <ul>
              {Object.keys(productQuantities).map(productId => {
                const product = data.find(item => item.idSanPham.toString() === productId);
                if (product) {
                  return (
                    <li key={productId}>
                      {product.tenSanPham} - ID: {productId} - Số lượng: {productQuantities[productId] || 1} - Giá: {(product.gia || 0) * (productQuantities[productId] || 1)}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <h3>Tổng tiền: {totalPrice}</h3>
          </div>
          <center><Button variant="contained" color="primary" onClick={handleSaveCustomerInfo}>Xác Nhận</Button></center>
        </div>
      </Modal>
    </div>
  );
};

export default MyComponent;
