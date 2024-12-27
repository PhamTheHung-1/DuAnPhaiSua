import React, { useState, useEffect } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import Login from "../../page/LoginPage";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ role, children }) => {
  const { auth } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.token) {
      setShowLogin(true);
      setErrorMessage("Bạn cần đăng nhập để truy cập trang này.");
      return;
    }

    try {
      const decoded = jwtDecode(auth.token);
      console.log("Decoded token:", decoded);

      if (role && decoded.role !== role) {
        setShowLogin(true);
        setErrorMessage("Bạn không có quyền truy cập trang này.");
        navigate("/");
      } else {
        setShowLogin(false);
      }
    } catch (error) {
      setShowLogin(true);
      setErrorMessage("Lỗi xác thực, vui lòng đăng nhập lại.");
    }
  }, [auth, role]);

  if (showLogin) {
    return (
      <Login
        show={showLogin}
        onClose={() => setShowLogin(false)}
        errorMessage={errorMessage}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
