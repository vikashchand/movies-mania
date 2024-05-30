import React from 'react';
import { FaEnvelope, FaTasks, FaClock, FaChartLine, FaDatabase, FaUserShield, FaMapMarkedAlt } from 'react-icons/fa';
import { MdEmail, MdPhone,MdOutlineDevicesOther } from 'react-icons/md';
import './LandingPage.css';

import featureImage from '../../assets/tamil.jpg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Manas Movies Portal</h1>
      <p>Serving entertainment with just few clicks</p>

      <div className="feature-container">
        <div className="feature-description">
          <h2>Key Features</h2>
          <ul className="feature-cards">
            <li className="feature-card">
              <div className="feature-icon">
                <FaTasks />
              </div>
              <div className="feature-details">
                <h3>Search Feature</h3>
                <p>Effortlessly Search movies of different taste and regions.</p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <div className="feature-details">
                <h3>Fast fetching</h3>
                <p>Stay hassle free from lagging and get a premium experience in free.</p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <div className="feature-details">
                <h3>Updates</h3>
                <p>Daily upload of 10+ movies to the website in hd quality.</p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaDatabase />
              </div>
              <div className="feature-details">
                <h3>Movies recommendation</h3>
                <p>Ai integration to suggest movies based on your type</p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaUserShield />
              </div>
              <div className="feature-details">
                <h3>Security Measures</h3>
                <p>Implement robust security measures to protect sensitive data. Enforce strict access control and data encryption to safeguard information.</p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <MdOutlineDevicesOther/>
              </div>
              <div className="feature-details">
                <h3>Multi device stream</h3>
                <p>Can stream movies on all devices.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
