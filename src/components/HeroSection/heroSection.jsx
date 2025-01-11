import React from "react";
import "./hero.css";
import MyIcon from "../../assets/happy-face.png";
import Vec from "../../assets/svgs/vector.svg";
import Corner from "../../assets/svgs/corner.svg";
import Stats from "../../assets/svgs/stats.svg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-vector">
        <img src={Vec} alt="Vector" width={"100%"} height={"40%"} />
      </div>
      <div className="hero-content">
        <div className="hero-image1">
          <img
            className="happyFace"
            src={MyIcon}
            alt="My Icon"
            width={"80%"}
            height={250}
          />
        </div>
        <h1>
          Bid. Buy. Sell. <br /> The Road Starts Here!
        </h1>
        <p>
          Discover the easiest way to auction your car or find the ride of your
          dreams. Join thousands of satisfied buyers and sellers in our trusted
          car auction marketplace!
        </p>
        <div className="hero-buttons">
          <Link to={"/signup"}>
          <button  className="signup-btn">SignUp for Free Now</button>
          </Link>
          <p className="login-text">
            Already have an account? <Link to={"/login"}>Log In now </Link>
          </p>
        </div>
      </div>
      <div className="hero-image">
        <img
          className="happyFace"
          src={MyIcon}
          alt="My Icon"
          width="60%"
          height="15%"
        />
        <img src={Corner} alt="Vector" className="corner-image" />
        <img src={Stats} alt="Vector" className="corner-image2" />
      </div>
    </section>
  );
};

export default HeroSection;
