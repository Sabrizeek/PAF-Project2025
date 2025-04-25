import React, { useState } from 'react';
import './Topbar.css';
import { FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Topbar = () => {
  const [isLoggedOutVisible, setIsLoggedOutVisible] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleUserClick = () => {
    setIsLoggedOutVisible(!isLoggedOutVisible); // Toggle the visibility
  };

  const handleLogout = () => {
    navigate('/login'); // Redirect to Login page on Logout
  };

  return (
    <div className="topbar">
      <div className="topbar-icons">
        <FaBell className="icon bell" title="Notifications" />
        <div className="user-container">
          <FaUserCircle
            className="icon user"
            title="User Profile"
            onClick={handleUserClick} // Add click handler here
          />
          {isLoggedOutVisible && (
            <div className="logout-dropdown">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <FaBars className="icon menu" title="Menu" />
      </div>
    </div>
  );
};

export default Topbar;
