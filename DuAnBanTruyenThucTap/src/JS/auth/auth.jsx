import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const adminAccount = {
  firstName: " ",
  lastName: "Admin",
  email: "admin@adhk.com",
  password: "admin123",
  role: "admin",
};

const generateToken = (payload) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa("akldjawuih45hkjdskfsefvfv"); // Mã hóa signature giả
  return `${header}.${body}.${signature}`;
};

const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = getUserFromToken(token);
      return user ? { token, user } : null;
    }
    return null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [auth]);

  // Cập nhật login để kiểm tra tài khoản admin
  const login = (email, password) => {
    if (email === adminAccount.email && password === adminAccount.password) {
      const token = generateToken({ email, role: "admin" });
      setAuth({
        token,
        user: {
          firstName: adminAccount.firstName,
          lastName: adminAccount.lastName,
          email,
          role: "admin",
        },
      });
      localStorage.setItem("token", token);
      return true;
    }

    // Kiểm tra với các tài khoản người dùng thông qua localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const token = generateToken({
        email: user.email,
        role: user.role || "user",
      });
      setAuth({
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role || "user",
        },
      });
      localStorage.setItem("token", token);
      return true;
    }

    return false;
  };

  const register = (firstName, lastName, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      return false;
    }

    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return login(email, password);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
