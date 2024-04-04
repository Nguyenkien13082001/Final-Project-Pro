import React from "react";

export default function Footer() {
  return (
    <footer className="footer-distributed">
      <div class="footer-left">
        <h3>
          Edu<span>Smart</span>
        </h3>

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">EduSmart © 2024</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>175 Lạc Long Quân</span> Cầu Giấy - Hà Nội
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>0962725840</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">Trungkien13082001@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        {/* <div class="footer-icons">
          <a href="#">
            <i style={{ color: "black" }} class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-github"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
}
