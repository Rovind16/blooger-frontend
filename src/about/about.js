import React from 'react';
import './about.css';
import aboutImage from '../images/logo-color.png';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src={aboutImage} alt="About Image" />
      </div>
      <div className="about-content">
        <h2>profile</h2>
        <p>
        To passionately enhance my knowledge and skills
through continuous learning, while actively
contributing to the growth and success of the
company.

        </p>
        <div className="about-features">
          <div className="feature">
            <i className="fas fa-chart-bar"></i>
            <h3>Rovind</h3>
            <p>Information Technology</p>
          </div>
          <div className="feature">
            <i className="fas fa-cogs"></i>
            <h3>FullStack</h3>
            <p>Html,Css,JavaScript,ReactJs,NodeJs</p>
          </div>
          <div className="feature">
            <i className="fas fa-users"></i>
            <h3>Project</h3>
            <p>BlogVista</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
