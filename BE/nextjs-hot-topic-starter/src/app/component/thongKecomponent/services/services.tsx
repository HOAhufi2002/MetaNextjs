'use client'
import { Item } from '../modelType/thongKemodel';
import axios from 'axios';

export const fetchDataTheoNgay = async () => {
  try {
    const response = await axios.get(`https://localhost:5001/api/thongke/theongay`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};

export const fetchDataTheoTen = async () => {
    try {
      const response = await axios.get(`https://localhost:5001/api/thongke/theoten`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  };