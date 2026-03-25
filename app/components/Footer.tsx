export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Haqqımızda</h3>
            <ul>
              <li>
                <a href="#">Sərfəli Al nədir?</a>
              </li>
              <li>
                <a href="#">Necə işləyir?</a>
              </li>
              <li>
                <a href="#">Karyera</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Kömək</h3>
            <ul>
              <li>
                <a href="#">Tez-tez soruşulan suallar</a>
              </li>
              <li>
                <a href="#">Bizimlə əlaqə saxlayın</a>
              </li>
              <li>
                <a href="#">Şikayət edin</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Hüquqi</h3>
            <ul>
              <li>
                <a href="#">Gizlilik siyasəti</a>
              </li>
              <li>
                <a href="#">İstifadə şərtləri</a>
              </li>
              <li>
                <a href="#">Kuki siyasəti</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Sosial şəbəkələr</h3>
            <div className="social-links">
              <a href="#">
                <i className="ph ph-facebook-logo"></i>
              </a>
              <a href="#">
                <i className="ph ph-instagram-logo"></i>
              </a>
              <a href="#">
                <i className="ph ph-twitter-logo"></i>
              </a>
              <a href="#">
                <i className="ph ph-linkedin-logo"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Sərfəli Al. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  )
}
