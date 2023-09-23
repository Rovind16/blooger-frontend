import image from '../images/blog.jpg';
import React from 'react';
import './firstpage.css';
import {Link} from 'react-router-dom';
import vid from './rr.mp4';

const FirstPage = () => {
  return (
    <div className="firstpage-container">
      <div className="firstpage-content">
        <h1 className="firstpage-title">Welcome to Our BlogVista</h1>
        <p className="firstpage-description">
        Every time you post something online, you have a choice. You can either make it something that adds 
        to the happiness levels in the world—or you can make it something that takes away
        </p>
        <Link to='/home'>
        <button className="firstpage-button">Get Started</button>
        </Link>
      </div>
      <div className="firstpage-image-container">
      <video className ="firstpage-image" src={vid} autoPlay loop muted>
        Your browser does not support the video tag.
</video>

      </div>
    </div>
  );
};

export default FirstPage;

