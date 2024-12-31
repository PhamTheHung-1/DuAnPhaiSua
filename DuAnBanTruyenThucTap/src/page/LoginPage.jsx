import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../JS/auth/auth"; 
import { use } from "react";

function Login({ show, onClose, onSwitchToRegister, errorMessage }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth()

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = await login(credentials); 
      console.log("User received from backend:", user);  
      if (user.role === "admin") {
        console.log("Đăng nhập thành công với role:", user.role);
        console.log("id:", user.id);
        navigate("/bookadmin");
      } else {
        console.log("Đăng nhập thành công với role:", user.role);
        navigate("/");
      }
      onClose();
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Đăng nhập thất bại, vui lòng thử lại!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Modal show={show} onHide={onClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="custom-title">Đăng nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleLoginSubmit} className="custom-form">
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="custom-input"
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="custom-input"
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="custom-login-btn">
            <b>Đăng nhập</b>
          </Button>
          <div className="text-center mb-3">
            <a href="#" className="forgot-password">
              Quên mật khẩu?
            </a>{" "}
            hoặc{" "}
            <a href="#" className="register" onClick={onSwitchToRegister}>
              Đăng ký
            </a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
