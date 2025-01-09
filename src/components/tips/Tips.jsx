import React from "react";
import "./tips.css"; // Import the CSS file
import handIcon from "../../assets/svgs/hand.svg";
import galleryIcon from "../../assets/svgs/gallery.svg";
import toolsIcon from "../../assets/svgs/tools.svg";
import gatherIcon from "../../assets/svgs/gather.svg";
import competitiveIcon from "../../assets/svgs/competitive.svg";
import penIcon from "../../assets/svgs/pen.svg";
import thumbIcon from "../../assets/svgs/thumb.svg";
import responsiveIcon from "../../assets/svgs/responsive.svg";
import safeIcon from "../../assets/svgs/safe.svg";
const tips = [
  {
    title: "Clean Your Car",
    description: "A clean car attracts more buyers.",
    imgSrc: handIcon,
  },
  {
    title: "Take Great Photos",
    description: "Showcase your car with clear, well-lit images.",
    imgSrc: galleryIcon,
  },
  {
    title: "Fix Minor Issues",
    description: "Address small repairs to boost value.",
    imgSrc: toolsIcon,
  },
  {
    title: "Gather Documents",
    description: "Prepare all paperwork like registration and service history.",
    imgSrc: gatherIcon,
  },
  {
    title: "Set a Competitive Price",
    description: "Research similar cars to price yours right.",
    imgSrc: competitiveIcon,
  },
  {
    title: "Write a Catchy Description",
    description: "Highlight your car’s best features.",
    imgSrc: penIcon,
  },
  {
    title: "Be Honest",
    description: "List your car’s condition accurately for trust.",
    imgSrc: thumbIcon,
  },
  {
    title: "Be Responsive",
    description: "Reply quickly to buyer inquiries.",
    imgSrc: responsiveIcon,
  },
  {
    title: "Ensure Safe Transactions",
    description: "Meet buyers in safe locations and use secure payments.",
    imgSrc: safeIcon,
  },
];

const TipsForSelling = () => {
  return (
    <div className="tips-container">
      <h2 className="title">Some Tips for Selling Your Car</h2>
      <p className="subtitle">
        See how real users sold their cars easily and successfully on our
        platform.
      </p>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div className="tip-card" key={index}>
            <img src={tip.imgSrc} alt={tip.title} className="tip-icon" />
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsForSelling;
