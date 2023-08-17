
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // You can create a CSS file for styling
import Image from "../profile-pic.jpg"; 
import { useNavigate } from 'react-router-dom';
const Navcommon = () => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate();
  
  const handleLogout = () => {
         setFlag(true)
        navigate("/");
  };

    // function to prevent acess to loginPages after LOGOUT
    window.addEventListener('popstate', function(event) { 
          if(flag){navigate("/");}
  });


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <b>LOGO</b>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="profile" onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
          <img src={Image} alt="Profile" className="profile-pic" />
          <span className="down-arrow">▼</span>
          {showLogoutMenu && (
            <div className="logout-menu">
              <button onClick={handleLogout}><b style={{"color":"red"}}>Logout</b></button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navcommon;
