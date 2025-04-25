import React from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Topbar from '../../Component/Topbar/Topbar';
import Footer from '../../Component/Footer/Footer';
import './Device.css';

const Device = () => {
  return (
    <div className="device-page">
      <Topbar />
      <div className="main-container d-flex">
        <Sidebar />
        <div className="device-content container">
          <h2 className="my-4">--Notifications--</h2>
          <div className="card shadow p-4">
            <form>
              

             
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Device;
