import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser,registerUser,logoutUser } from "./authSV";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Thông tin người dùng
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Kiểm tra token khi ứng dụng load
  useEffect(() => {
    const token = localStorage.getItem("user");
    console.log(token)
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
}, []);

  // Đăng nhập
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      console.log("Login response:", data);
      setUser({ token: data.token, ...data.user });
      localStorage.setItem("token", data.token); 
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user; // Lưu token vào trạng thái
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Đăng ký
  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      setUser({ token: data.token });
      navigate("/")
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
export default AuthProvider;
