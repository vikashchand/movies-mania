import React from 'react';
import './Home.css';
import { Routes, Route } from 'react-router-dom';
import About from '../about/About';
import SideeNav from '../../components/SideeNav';

import jwtDecode from 'jwt-decode';


import LandingPage from '../LandingPage/LandingPage';

import Search from '../Search/Search';
import Playlist from '../Search/Playlist';
import Private from '../Search/Private';

const Home = () => {
  const token = localStorage.getItem('userInfo');
  let decodedToken = jwtDecode(token);
  console.log(decodedToken, 'decodedToken');
   const role = decodedToken.data.is_admin;
 console.log(role, 'ghg');
  return (
    <div>
      
      <div className="home-container">
      <div className="side-nav-container">
        <SideeNav />
      </div>
      <div className="content-container">
      <div className="heading-tab">
        <h1>Manas movie Portal</h1>
      </div>
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/public" element={<Playlist/>} />
          <Route path="/private" element={<Private/> } />
          
        </Routes>
      </div>
      </div>
    </div>
  );
};

export default Home;
