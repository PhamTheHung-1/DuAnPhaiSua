import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../JS/auth/auth";

function Login({ show, onClose, onSwitchToRegister, errorMessage }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = login(email, password);
    if (isLoggedIn) {
      // Phân biệt vai trò để chuyển hướng
      const role = email === "admin@adhk.com" ? "admin" : "user";

      //localStorage.setItem("token", token);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      console.log("Đăng nhập thành công với role:", role);
      onClose();
    } else {
      setError("Thông tin đăng nhập không chính xác!");
    }
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
