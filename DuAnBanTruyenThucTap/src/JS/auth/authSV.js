import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Adjust to your Fastify server URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log("Backend response:", response.data);
    localStorage.setItem("user", JSON.stringify(response.data.user))
    return await response.data;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('token'); 
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
