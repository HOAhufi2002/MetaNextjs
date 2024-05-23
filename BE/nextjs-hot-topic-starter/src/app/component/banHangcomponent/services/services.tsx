'use client'
import { Item } from '../modelType/donHangModel';
import { ListDonHang } from '../../donHangcomponent/modelType/listDonHangModel';
import axios from 'axios';
interface BillData {
  tenKhachHang: string;
  soDienThoai: string;
  ngayDat: Date;
  tongTien: number;
  chiTietDonHangs: {
    idSanPham: number;
    gia: number;
  }[];
}
const API_URL = 'https://localhost:5001/api/banhang';
// Hàm gọi API để lấy danh sách sản phẩm
export const fetchData = async () => {
  try {
    const response = await axios.get(`https://localhost:5001/api/sanpham/getSP`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};

export const addBill = async (billData: BillData) => {
  try {
    await axios.post(`${API_URL}/banHang`, billData);
  } catch (error) {
    console.error('Error adding bill:', error);
    throw new Error('Error adding bill');
  }
};

export const fectDonHang= async () => {
  try{
    const response = await axios.get(`https://localhost:5001/api/banhang/getDonHang`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};