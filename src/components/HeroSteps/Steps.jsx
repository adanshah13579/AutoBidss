import React from "react";
import "./Steps.css";
import CreateA from "../../assets/svgs/account.svg";
import Lcar from "../../assets/svgs/list.svg";
import Sell from "../../assets/svgs/sell.svg";
import Tick from "../../assets/svgs/tick.svg";
import Ready from "../../assets/svgs/bannerCard.svg";

const Steps = () => {
  return (
    <>
      <div className="steps-container" id="howitworks">
        {/* Step 1 */}
        <div className="step step-reverse">
          <div className="step-content">
            <h2 className="step-title">
              <span className="step-number">Step 1:</span> Create an Account
            </h2>
            <p className="step-description">
              Getting started is quick and easy. Sign up with your email or
              social account and create your seller profile. Start your journey
              to hassle-free car selling today!
            </p>
            <ul className="step-list">
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Quick and free registration.
              </li>
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Secure account setup for sellers.
              </li>
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Start accessing our trusted auction platform.
              </li>
            </ul>
          </div>
          <div className="step-image">
            {/* Replace with your image or SVG */}
            <img src={CreateA} alt="Create Account" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="step-content">
            <h2 className="step-title">
              <span className="step-number">Step 2:</span> List Your Car
            </h2>
            <p className="step-description">
              Share your car's details like make, model, and condition. Upload
              clear photos, set a competitive starting bid, and showcase your
              car to thousands of potential buyers.
            </p>
            <ul className="step-list">
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Add key car details like make, year, and condition.
              </li>
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Upload high-quality photos to attract buyers.
              </li>
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Set a starting bid or reserve price effortlessly.
              </li>
            </ul>
          </div>
          <div className="step-image">
            {/* Replace with your image or SVG */}
            <img src={Lcar} alt="Step 2" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="step step-reverse">
          <div className="step-content">
            <h2 className="step-title">
              <span className="step-number">Step 3:</span> Sell to the Highest
              Bidder
            </h2>
            <p className="step-description">
              Once your listing is live, watch the bids roll in! Choose the best
              offer, finalize the deal, and receive your payment securely.
              Selling your car has never been this simple.
            </p>
            <ul className="step-list">
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Track bids and offers in real time.
              </li>
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Choose the highest or most suitable bid.
              </li>
              <li>
                <img src={Tick} width={12} style={{ marginRight: 5 }} />
                Secure and hassle-free payment options.
              </li>
            </ul>
          </div>
          <div className="step-image">
            {/* Replace with your image or SVG */}
            <img src={Sell} alt="Create Account" />
          </div>
        </div>
      </div>
      <div className="readyCard">
        <img className="readyImage" src={Ready} alt="Create Account" />

        <div className="readyOverlay">
          <button className="btnStartSelling">Start Selling → </button>
        </div>
      </div>
    </>
  );
};

export default Steps;
