import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home"; // Import Home component
import Login from "./Pages/Login/Login"; // Import Login component
import Signup from "./Pages/Signup/Signup"; // Import Signup component
import Device from "./Pages/Device/Device"; // Import Device component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/device" element={<Device />} /> {/* Add Device Page */}
      </Routes>
    </Router>
  );
}

export default App;
