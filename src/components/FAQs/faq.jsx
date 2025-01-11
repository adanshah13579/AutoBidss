import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How do I list my car for auction?",
    answer:
      "To list your car for auction, simply sign up, provide car details, upload photos, and submit your listing.",
  },
  {
    question: "What fees are involved in selling my car?",
    answer:
      "There are minimal fees, including a listing fee and a commission fee upon a successful sale.",
  },
  {
    question: "How long does the auction process take?",
    answer:
      "The auction process typically takes 7-10 days, depending on the car and bidding activity.",
  },
  {
    question: "How do I get paid after selling my car?",
    answer:
      "You will receive payment through a secure transaction process within 3-5 business days after the sale is finalized.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>
          Having questions? We have got you! for more detailed queries please
          visit contact us!
        </p>
      </div>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{item.question}</h3>
              <span
                className={`faq-toggle ${openIndex === index ? "rotate" : ""}`}
              >
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`faq-answer ${openIndex === index ? "open" : ""}`}
              style={{
                maxHeight: openIndex === index ? "100px" : "0px",
                transition:
                  "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
                opacity: openIndex === index ? "1" : "0",
              }}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
