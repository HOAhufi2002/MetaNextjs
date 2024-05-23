'use client'
import { Item } from '../modelType/loaiSPmodel';
import axios from 'axios';
type ProductDataType = Item;

export const fetchDataLoai = async () => {
    try {
      const response = await axios.get(`https://localhost:5001/api/loaisanpham/getLoai`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  };// Hàm gọi API để thêm sản phẩm mới
  export const addProductloai = async (productData: ProductDataType) => {
    try {
      await axios.post(`https://localhost:5001/api/loaisanpham/addloaiSP`, productData);
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Error adding product');
    }
  };
  // Hàm gọi API để xóa sản phẩm
export const deleteProductloai = async (id: number) => {
  try {
    await axios.delete(`https://localhost:5001/api/loaisanpham/Delete_loaiProduct${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};
