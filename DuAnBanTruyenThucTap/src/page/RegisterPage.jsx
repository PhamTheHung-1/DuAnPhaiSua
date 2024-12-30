import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { registerUser } from "../JS/auth/authSV";

function Register({ show, onClose }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: 'user',  // Default role is user
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    if (!userData) {
      setError("Vui lòng điền hết tất cả thông tin.");
      return;
    }
    try {
      await registerUser(userData);
      alert('Đăng ký thành công!');
      onClose();
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Đăng ký thất bại, vui lòng thử lại!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Modal show={show} onHide={onClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="custom-title">Tạo tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegisterSubmit} className="custom-form">
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group controlId="formBasicFirstName" className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i class="fa fa-user"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Họ"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="custom-input"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicLastName" className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i class="fa fa-user"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Tên"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="custom-input"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
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
                name="password"
                placeholder="Mật khẩu"
                value={userData.password}
                onChange={handleChange}
                className="custom-input"
                required
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="custom-login-btn">
            <b>Đăng ký</b>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
