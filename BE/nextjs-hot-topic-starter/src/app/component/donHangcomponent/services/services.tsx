'use client'
import axios from 'axios';

export const fetchDonHang = async () => {
  try {
    const response = await axios.get('https://localhost:5001/api/banhang/getDonHang');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};

export const fetchDonHangChiTiet = async (idDonHang : number) => {
  try {
    const response = await axios.get(`https://localhost:5001/api/ChiTietDonHang/${idDonHang}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};