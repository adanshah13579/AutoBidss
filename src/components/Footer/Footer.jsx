import React from "react";
import "./Footer.css";
import Apple from "../../assets/svgs/apple.svg";
import Google from "../../assets/svgs/google.svg";
import Tik from "../../assets/svgs/tik.svg";
import Fb from "../../assets/svgs/fb.svg";
import X from "../../assets/svgs/x.svg";
import YT from "../../assets/svgs/yt.svg";
import Insta from "../../assets/svgs/insta.svg";
import { Link } from "react-router-dom";
import CarReportPage from "../cartreportpage/carreportpage";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <nav className="footer-nav">
          <Link to="/home">HOME</Link>
          <a href="#">ABOUT US</a>
          <a href="#">HOW IT WORKS</a>
          <Link to="/contact">CONTACT US</Link>
          <a href="#">AUCTIONS</a>
          <a href="#">FAQS</a>
          <a href="#">TERMS & CONDITIONS</a>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">HELP CENTER</a>
        </nav>
      </div>

      <div className="footer-content">
        <div className="footer-description">
          <h2>Drivebidz</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Nibh sit urna cursus mi
            lorem. Odio vitae est est sed odio eget non vestibulum. Phasellus
            ullamcorper mattis nascetur elementum non.
          </p>
        </div>
        <div
          className="topLevel"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div className="footer-buttons">
            <button className="store-button">
              <div className="store-button1">
                <img src={Apple} />
                App Store
              </div>
            </button>
            <button className="store-button">
              <div className="store-button1">
                <img src={Google} />
                Google Play
              </div>
            </button>
          </div>

          <div className="footer-bottom">
            <div className="social-icons">
              <a href="#">
                <img src={Fb} />
              </a>

              <a href="#">
                <img src={Insta} />
              </a>
              <a href="#">
                <img src={X} />
              </a>
              <a href="#">
                <img src={Tik} />
              </a>

              <a href="#">
                <img src={YT} />
              </a>
            </div>
          </div>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;
