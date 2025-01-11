

import "./Landing.css";
import Navbar from "../../components/Navbar/navbar";
import HeroSection from "../.././components/HeroSection/heroSection";
import BottomHero from "../.././components/HeroBottom/BottomHero";
import Steps from "../.././components/HeroSteps/Steps";
import Cards from "../.././components/CustomerReviews/card";
import { reviews } from "./reviewsData";
import TipsForSelling from "../../components/tips/Tips";
import FAQ from "../../components/FAQs/faq";
import Footer from "../../components/Footer/Footer";
function LandingPage() {
  return (
    <div id="root">
      <Navbar />
      <HeroSection />
      <BottomHero />
      <Steps />
      <div className="reviewHead">
        <h1>See what AudoBidz users are saying</h1>
        <p>
          See how real users sold their cars easily and successfully on our
          platform.
        </p>
        <div className="reviews">
          {reviews.map((review, index) => (
            <Cards
              key={index}
              name={review.name}
              desgination={review.designation}
              text={review.text}
              stars={review.stars}
              picture={review.picture}
            />
          ))}
        </div>
        <TipsForSelling />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
