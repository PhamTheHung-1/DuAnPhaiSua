const Footer = () => {
  return (
    <div>
      <footer
        className="text-center text-lg-start bg-body-tertiary text-muted"
        id="footer"
      >
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Liên hệ chúng tôi qua mạng xã hội:</span>
          </div>
          {/* Left */}

          {/* Right */}
          <div>
            <a href="#" className="me-4 text-reset">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}

        {/* Section: Links */}
        <section>
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Hỗ trợ</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Hướng dẫn đặt hàng{" "}
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Chính sách đổi trả - hoàn tiền
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Phương thức vận chuyển
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Phương thức thanh toán
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">FOUR BOOK</h6>
                <p>
                  {" "}
                  <i className="fa-solid fa-user-tie me-2"></i> Giám đốc: Lê
                  Đình Kiên
                </p>
                <p>
                  <i className="fas fa-home me-3"></i>{" "}
                  <a href="https://www.google.com/maps/dir//Ch%E1%BB%A3+Gi%C3%A0u+Ph%E1%BB%91+P.+Ch%E1%BB%A3+Gi%E1%BA%A7u+T%C3%A2n+H%E1%BB%93ng+T%E1%BB%AB+S%C6%A1n,+B%E1%BA%AFc+Ninh/@21.1216248,105.9575839,17.5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x313507dcfbdec085:0xd699ee01294414dd!2m2!1d105.9612729!2d21.1163293?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D">
                    Chợ Giàu, Phố P. Chợ Giầu, Tân Hồng, Từ Sơn, Bắc Ninh
                  </a>
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  <a href="mailto:>AHDKbook@gmail.com">fourbook@gmail.com</a>
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i>:
                  <a href="tel: 1900571596">(+84) 1900571596</a>
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links */}

        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            fourbook.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
    </div>
  );
};

export default Footer;
