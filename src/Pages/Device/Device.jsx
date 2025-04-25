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
          <h2 className="my-4">Add Device</h2>
          <div className="card shadow p-4">
            <form>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="deviceId" className="form-label">Device ID:</label>
                  <input type="text" id="deviceId" className="form-control" placeholder="Enter Device ID" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="tunnelName" className="form-label">Tunnel Name:</label>
                  <input type="text" id="tunnelName" className="form-control" placeholder="Enter Tunnel Name" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="macAddress" className="form-label">MAC Address:</label>
                  <input type="text" id="macAddress" className="form-control" placeholder="Enter MAC Address" />
                </div>
              </div>

              {/* "Reading Types" Heading Outside Card */}
              <h4 className="reading-types-heading">Reading Types:</h4>

              {/* New Card for Reading Types */}
              <div className="card shadow p-4 mb-3 reading-types-card">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="temperature" />
                      <label className="form-check-label" htmlFor="temperature">Temperature</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="humidity" />
                      <label className="form-check-label" htmlFor="humidity">Humidity</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="soilMoisture" />
                      <label className="form-check-label" htmlFor="soilMoisture">Soil Moisture</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="co2Level" />
                      <label className="form-check-label" htmlFor="co2Level">CO₂ Level</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="lux" />
                      <label className="form-check-label" htmlFor="lux">LUX</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="npkLevel" />
                      <label className="form-check-label" htmlFor="npkLevel">NPK Level</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="oxygenLevel" />
                      <label className="form-check-label" htmlFor="oxygenLevel">O₂ Level</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="electricalConductivity" />
                      <label className="form-check-label" htmlFor="electricalConductivity">Electrical Conductivity</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-danger">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Device;
