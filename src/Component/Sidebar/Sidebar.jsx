import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import "./Sidebar.css"; // Import the Sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Dashboard Link */}
      <NavLink to="/" className="sidebar-item" activeClassName="active">
        <i className="bi bi-grid-fill sidebar-icon"></i> Dashboard
      </NavLink>

    {/* Report Link */}
    <NavLink to="/content" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Content Discovery
      </NavLink>

{/* Report Link */}
    <NavLink to="/learning" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Learning
      </NavLink>

    {/* Report Link */}
    <NavLink to="/posts" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Posts
      </NavLink>
    
    {/* Report Link */}
    <NavLink to="/learningplans" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Learning Plans
      </NavLink>

      {/* Add notifications Link */}
      <NavLink to="/device" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Notifications
      </NavLink>

      {/* Report Link */}
      <NavLink to="/acheievements" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Acheivement Process
      </NavLink>

      <NavLink to="/userexperience" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> User Experience
      </NavLink>
    </div>
  );
};

export default Sidebar;
