import React from 'react';
import './Footer.css'; // Để dễ dàng quản lý CSS, chúng ta sẽ tạo một tệp CSS riêng

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__section">
          <h4 className="footer__title">Về chúng tôi</h4>
          <ul className="footer__list">
            <li><a href="/">Giới thiệu</a></li>
            <li><a href="/">Liên hệ</a></li>
            <li><a href="/">Cửa hàng</a></li>
            <li><a href="/">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Dịch vụ khách hàng</h4>
          <ul className="footer__list">
            <li><a href="/">Hướng dẫn mua hàng</a></li>
            <li><a href="/">Chính sách đổi trả</a></li>
            <li><a href="/">Hỗ trợ khách hàng</a></li>
            <li><a href="/">Chính sách bảo hành</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Chứng nhận</h4>
          <ul className="footer__list">
            <li><a href="/">Chứng nhận bảo mật</a></li>
            <li><a href="/">Chứng nhận thanh toán</a></li>
            <li><a href="/">Quyền lợi khách hàng</a></li>
          </ul>
        </div>

        {/* <div className="footer__section">
          <h4 className="footer__title">Tải ứng dụng</h4>
          <div className="footer__app-links">
            <a href="/" className="footer__app-link">
              <img src="/images/google-play.png" alt="Google Play" />
            </a>
            <a href="/" className="footer__app-link">
              <img src="/images/app-store.png" alt="App Store" />
            </a>
          </div>
        </div> */}
      </div>

      <div className="footer__bottom">
        <div className="footer__social">
          <a href="/" className="footer__social-icon">FB</a>
          <a href="/" className="footer__social-icon">IG</a>
          <a href="/" className="footer__social-icon">TW</a>
        </div>
        <p className="footer__copyright">© 2024 Công ty ABC. Bảo lưu quyền.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
