import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import JS (bao gồm Popper)
import React, { useState, useEffect } from "react";
import useToggleMenu from "../JS/useToggleMenu";
import { useAuth } from "../JS/auth/auth";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import { useNavigate, Link } from "react-router-dom";

function Header({ lengthCart }) {
  const { isMenuOpen, toggleMenu } = useToggleMenu(); //menu
  const [showLogin, setShowLogin] = useState(false); //dang nhap
  const [showRegister, setShowRegister] = useState(false); //dang ky
  const [searchState, setSearch] = useState(""); //timkiem
  const [showCart, setShowCart] = useState(false); //gio hang
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
}, []);

  const handleSearchSubmitForm = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchState}`);
  };

  const handleLogout = async () => {
    try {
      await logout();  
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCart = () => {
    navigate("/cart");
  };
  return (
    <div className="headerr">
      <div className="footer1  ">
        <div className="social">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>

        <div className="welcome">
          <p>
            Welcome to FOUR book page ! Nếu cần giúp đỡ, hãy liên hệ ngay với
            chúng tôi qua thông tin sau:
          </p>
        </div>
        <div className="contact">
          <a href="tel:1900571596">
            <i className="fa-solid fa-phone-volume"></i> (+84) 1900571596
          </a>
          <a href="mailto:fourbook@gmail.com">
            <i className="fa-solid fa-envelope"></i> fourbook@gmail.com
          </a>
        </div>
      </div>
      {/* nav */}
      <div className="testnav ">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="public/img/logo_four.png" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                <span style={{ fontSize: "24px" }}>✖</span> // Icon "X"
              ) : (
                <span className="navbar-toggler-icon"></span> // Default Hamburger icon
              )}
            </button>
            <div
              className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
              id="navbarScroll"
            >
              <ul
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                style={{ "--bs-scroll-height": "100px" }}
              >
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active fs-5" href="/#gt">
                    Giới thiệu
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/books">
                    Cửa Hàng
                  </Link>
                </li>
                <li className="nav-item ">
                  <a href="#footer" className="nav-link active fs-5">
                    Liên hệ
                  </a>
                </li>
              </ul>
              {/* Search của Kiên */}
              <form
                className="d-flex mt-1 me-5"
                role="search"
                onSubmit={handleSearchSubmitForm}
              >
                <input
                  className="form-control me-2 inputKien  "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button className="btn btn-outline-success " type="submit">
                  Search
                </button>
              </form>

              {/* dang nhap dang ky */}

              <div className="log nav-item d-flex ">
                {user ? (
                  <>
                    <a href="#" className="user-info">
                      <i className="fa fa-user"></i>  {user.lastName}
                    </a>
                    <a href="#" className="logout-btn" onClick={handleLogout}>
                      <i className="fa fa-sign-out-alt"></i> Đăng xuất
                    </a>
                  </>
                ) : (
                  <>
                    <a href="#" className="login" onClick={handleLoginShow}>
                      <i className="fa-solid fa-right-to-bracket"></i>Đăng nhập
                    </a>
                    {showLogin && (
                      <Login
                        show={showLogin}
                        onClose={handleLoginClose}
                        onSwitchToRegister={handleRegisterShow}
                      />
                    )}

                    <a
                      href="#"
                      className="register-btn"
                      onClick={handleRegisterShow}
                    >
                      <i className="fas fa-edit"></i>Đăng ký
                    </a>
                    {showRegister && (
                      <Register
                        show={showRegister}
                        onClose={handleRegisterClose}
                        onSwitchToLogin={handleLoginShow}
                      />
                    )}
                  </>
                )}
              </div>
              {/* gio hang cua Anh */}
              <div className="container_add_cart">
                <i
                  className="fa-solid fa-bag-shopping btn_add_cart"
                  onClick={handleCart}
                ></i>
                {lengthCart > 0 && (
                  <span className="soluong">({lengthCart})</span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <hr></hr>
    </div>
  );
}

export default Header;
