import React from 'react';
import './contactus.css';

const ContactPage = () => {
  return (
    <div className='ct'>
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <div className="contact-item">
          <span className="contact-label">Email:</span>
          <span className="contact-value">rovindddd@gmail.com</span>
        </div>
        <div className="contact-item">
          <span className="contact-label">Phone:</span>
          <span className="contact-value">6383130961</span>
        </div>
        <div className="contact-item">
          <span className="contact-label">Address:</span>
          <span className="contact-value">Chennai, Tamil Nadu, India</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
