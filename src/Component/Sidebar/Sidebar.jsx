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


      {/* Add Device Link */}
      <NavLink to="/device" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Add Device
      </NavLink>

      {/* Report Link */}
      <NavLink to="/report" className="sidebar-item" activeClassName="active">
        <i className="bi bi-diamond-fill sidebar-icon"></i> Report
      </NavLink>
    </div>
  );
};

export default Sidebar;
