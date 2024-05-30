

import React,{useState} from 'react';
import jwtDecode from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import './SideeNav.css'; // Import the CSS file
import { FaBars,FaSearch

 } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';

import {BiSolidPlaylist} from 'react-icons/bi';

import {HiUserGroup} from 'react-icons/hi';
import{MdAdminPanelSettings} from 'react-icons/md';
import {RiChatPrivateFill} from 'react-icons/ri';

import { AiFillHome } from 'react-icons/ai';
import { FiLogOut} from 'react-icons/fi'
import {SiAdguard} from 'react-icons/si';

const SideeNav = () => {


 // const navigate = useNavigate();
 const [isNavOpen, setIsNavOpen] = useState(false);
 const token = localStorage.getItem('userInfo');
 let decodedToken = jwtDecode(token);
 const role = decodedToken.data.is_admin;
 console.log(role, 'gg');



  const handleLogout = () => {
   localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={`sidenav-container ${isNavOpen ? 'expanded' : 'minimized'}`}>
    <div className="menu">
      <FaBars className="hamburger-icon" onClick={toggleNav} />
    </div>
    <div className="menu">
    <FaBars className="hamburger-icons" />
  </div>
    <NavLink to={'/home/LandingPage'}  className="active-link">
    {isNavOpen ? 'Home' : <AiFillHome />}
      
    </NavLink>

    

    <NavLink to={'/home/search'} >
       
    {isNavOpen ? 'Search' : <FaSearch/>}


  </NavLink>

  <NavLink to={'/home/Public'} >
       
  {isNavOpen ? 'Public' : <BiSolidPlaylist />}




</NavLink>

<NavLink to={'/home/private'} >
       
{isNavOpen ? 'Private' : <RiChatPrivateFill/>}




</NavLink>


  





       

       
          
          <NavLink onClick={handleLogout}>
          {isNavOpen ? 'LogOut' : <FiLogOut />}
        </NavLink>


        </div>
  );
};

export default SideeNav;


