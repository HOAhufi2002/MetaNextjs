import axios from 'axios';

export const dangNhap = async (username: string, password: string) => {
    try {
        const url = `https://localhost:44379/api/login/dangNhap?username=${username}&password=${password}`;
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
};
