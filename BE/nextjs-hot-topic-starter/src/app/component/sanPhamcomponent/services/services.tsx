'use client'
import { Item } from '../modelType/types';

// Loại dữ liệu của dữ liệu sản phẩm
import axios from 'axios';
type ProductDataType = Item;

const API_URL = 'https://localhost:5001/api/sanpham';
export const fetchData = async (searchKeyword?: string) => {
  try {
    const url = searchKeyword ? `${API_URL}/getSP?searchKeyword=${searchKeyword}` : `${API_URL}/getSP`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};

export const fetchDataLoai = async () => {
  try {
    const response = await axios.get(`https://localhost:5001/api/loaisanpham/getLoai`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};
export const addProduct = async (productData: ProductDataType) => {
  try {
    await axios.post(`${API_URL}/addSP`, productData);
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Error adding product');
  }
};

// Hàm gọi API để cập nhật sản phẩm
export const updateProduct = async (id: number, productData: ProductDataType) => {
  try {
    await axios.put(`${API_URL}/Update_Product${id}`, productData);

  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

// Hàm gọi API để xóa sản phẩm
export const deleteProduct = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/Delete_Product${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};