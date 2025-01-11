import React from "react";
import "./Bottom.css";
import Car from "../../assets/svgs/car.svg";
import lock from "../../assets/svgs/lock.svg";
import watch from "../../assets/svgs/watch.svg";

const BottomHero = () => {
  return (
    <div className="features-container">
      <div className="feature-item">
        <div className="icon-circle">
          {/* Add your car icon SVG here */}
          <img src={Car} alt="Car Icon" />
        </div>
        <p>Explore a vast selection of cars for every need and budget.</p>
      </div>
      <div className="feature-item">
        <div className="icon-circle">
          {/* Add your lock icon SVG here */}
          <img src={lock} alt="Lock Icon" />
        </div>
        <p>Enjoy peace of mind with safe and transparent deals.</p>
      </div>
      <div className="feature-item">
        <div className="icon-circle">
          {/* Add your clock icon SVG here */}
          <img src={watch} alt="Clock Icon" />
        </div>
        <p>List your car and connect with buyers quickly and effortlessly.</p>
      </div>
    </div>
  );
};

export default BottomHero;
