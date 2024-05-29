'use client'
import { User } from '../modelType/userModel';
import axios from 'axios';

export const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:5001/api/taikhoan/getTK`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  };
  export const addUser = async (user: User): Promise<void> => {
    try {
      await axios.post('https://localhost:5001/api/taikhoan/addUser', user);
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Error adding user');
    }
  };
  export const checkExistingAccount = async (username: string) => {
    
    try {
    const response = await axios.get(`https://localhost:5001/api/taikhoan/CheckExistAccount?tenDangNhap=${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Error checking username existence');
  }
};
