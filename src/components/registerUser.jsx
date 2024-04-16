import axios from 'axios';

const registerUser = async (userData) => {

    const API_BASE_URL = 'http://localhost:4000';

    //http://localhost:4000/users

    const api = axios.create({
        baseURL: API_BASE_URL
    });

    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default registerUser;