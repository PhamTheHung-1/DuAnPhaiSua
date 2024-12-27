import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../JS/auth/auth";

function Register({ show, onClose }) {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("Vui lòng điền hết tất cả thông tin.");
      return;
    }

    // Mặc định vai trò là "user"
    register(firstName, lastName, email, password);
    onClose();
    navigate("/");
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
