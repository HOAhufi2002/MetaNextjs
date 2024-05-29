import axios from 'axios';

export const dangNhap = async (username: string, password: string) => {
    try {
        const url = 'https://localhost:5001/api/login';
        const response = await axios.post(url, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
};
