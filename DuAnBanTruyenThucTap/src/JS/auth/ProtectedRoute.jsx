import React, { useState, useEffect } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import Login from "../../page/LoginPage";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setShowLogin(true);
      alert("Bạn cần đăng nhập để truy cập trang này.");
      navigate('/');
      return;
    }
    
    try {
      console.log("Required role:", role);
      console.log("User role:", user?.role);
      
      if (role && user?.role !== role) {
        setErrorMessage("Bạn không có quyền truy cập trang này.");
        setShowLogin(true);
        navigate("/");
      } else {
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Token decoding error:", error.message);
      setErrorMessage("Lỗi xác thực, vui lòng đăng nhập lại.");
      setShowLogin(true);      
    }
  }, [user, role, navigate]);

  if (showLogin) {
    return <Login errorMessage={errorMessage} />;
  }

  return user && (!role || user.role === role) ? children : null;
};

export default ProtectedRoute;
