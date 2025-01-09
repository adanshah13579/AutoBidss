import React from 'react';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'; // Import social media icons
import NavbarLoggedIn from '../../components/NavbarLoggedIn/navbarLoggedIn';
import Footer from '../../components/Footer/Footer';
import './Contact.css';
import Vec from '../../assets/svgs/vector.svg';

const Contact = () => {
  return (
    <div id='root'>
      {/* Navbar Section */}
      <NavbarLoggedIn />

      {/* Hero Section */}
      <div className='content'>
        <div className='hero-vector'>
          <img src={Vec} alt='Vector' width={'100%'} height={'40%'} />
        </div>

        <div className='left-main'>
          <h2 className='heading'>Contact Us</h2>
          <h1>Get in touch with us. We're here to assist you.</h1>
        </div>

        {/* Social Media Icons */}
        <div className='right-main'>
          <ul className='listIcons'>
            <li>
              <a className='anchorIconcs' href='#' target='_blank' rel='noopener noreferrer'>
                <FacebookOutlined  />
              </a>
            </li>
            <li>
              <a className='anchorIconcs'  href='#' target='_blank' rel='noopener noreferrer'>
                <InstagramOutlined  />
              </a>
            </li>
            <li>
              <a className='anchorIconcs'  href='#' target='_blank' rel='noopener noreferrer'>
                <TwitterOutlined/>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='contact-form'>
        <div className='form-group'>
          <div>
            <label>Your Name</label>
            <input type='text' />
          </div>
          <div>
            <label>Your Email</label>
            <input type='email' />
          </div>
          <div>
            <label>Phone Number</label>
            <input type='text' />
          </div>
        </div>
        <div>
          <label>Message</label>
          <textarea></textarea>
        </div>
        <div>
          <button className='submit-btn'>Leave Us a Message</button>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className='contactInfo'>
        <div className='leftDetails'>
          <h5>Contact Info</h5>
          <p>We are always happy to assist you</p>
        </div>
        <div className='rightDetails'>
          <div className='emailDetail'>
            <h5>Email Address</h5>
            <h6>help@info.com</h6>
            <h5>Assistance hours: Monday - Friday 6 am to 8 pm EST</h5>
          </div>
          <div className='numberDetail'>
            <h5>Number</h5>
            <h6>(808)998-34256</h6>
            <h5>Assistance hours: Monday - Friday 6 am to 8 pm EST</h5>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className='subscribe'>
        <div className='message'>
          <h2>Subscribe to our Newsletter</h2>
          <h5>
            Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter.
          </h5>
        </div>
        <div className='subscribeBox'>
          <input id='input' type='email' placeholder='Enter your Email' />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Contact;
