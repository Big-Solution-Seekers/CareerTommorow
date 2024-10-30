import React from 'react';
import '../styles/AboutUs.css';
import Abdullah from '../images/Abdullah.jpg'
import Rashell from '../images/Rashell.jpg'
import Adrian from '../images/Adrian.jpg'

const AboutUs = () => {
  const linkedInUrlAbdullah = "https://www.linkedin.com/in/abdullah-khan-395645260/"; // Replace with your LinkedIn URL
  const linkedInUrlRashell = "https://www.linkedin.com/in/rashell-aldas-41818418a/"; // Replace with your LinkedIn URL
  const linkedInUrlAdrian = "https://www.linkedin.com/in/adrian-campos-3199002bb/"; // Replace with your LinkedIn URL

  return (

  
    <div className="about-us-container">

      <div className="about-us-card">
        <img
          src= {Abdullah} // Replace with the correct path to your image
          alt="About Us"
          className="about-us-image"
        />
         <p style={{ fontWeight: 'bold', fontSize: 'Larger' }}>Abdullah Khan</p>


        <p className="about-us-text">
          Welcome to our community! We are dedicated to providing the best resources and support for
          individuals looking to advance their careers. Our team is passionate about fostering
          connections and sharing knowledge to help you succeed.
        </p>

       
        <a href={linkedInUrlAbdullah} target="_blank" rel="noopener noreferrer">
          <button className="about-us-button">Connect on LinkedIn</button>
        </a>
      </div>

      <div className="about-us-card">
        <img
          src={Rashell} // Replace with the correct path to your image
          alt="About Us"
          className="about-us-image"
        />
        <p style={{ fontWeight: 'bold', fontSize: 'Larger' }}>Rashell Aldas</p>
        <p className="about-us-text">
          Welcome to our community! We are dedicated to providing the best resources and support for
          individuals looking to advance their careers. Our team is passionate about fostering
          connections and sharing knowledge to help you succeed.
        </p>
        
        <a href={linkedInUrlRashell} target="_blank" rel="noopener noreferrer">
          <button className="about-us-button">Connect on LinkedIn</button>
        </a>
      </div>

      <div className="about-us-card">
        <img
          src={Adrian} // Replace with the correct path to your image
          alt="About Us"
          className="about-us-image"
        />
        <p style={{ fontWeight: 'bold', fontSize: 'Larger' }}>Adrian Campos</p>
        <p className="about-us-text">
          Welcome to our community! We are dedicated to providing the best resources and support for
          individuals looking to advance their careers. Our team is passionate about fostering
          connections and sharing knowledge to help you succeed.
        </p>
        
        <a href={linkedInUrlAdrian} target="_blank" rel="noopener noreferrer">
          <button className="about-us-button">Connect on LinkedIn</button>
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
