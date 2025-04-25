import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Footer from "../../Component/Footer/Footer";
import Topbar from "../../Component/Topbar/Topbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  const [operationMode, setOperationMode] = useState({
    tunnel01: "Auto",
    tunnel02: "Manual",
  });

  const [showPopup, setShowPopup] = useState(false); // State for the popup visibility
  const [sliderValues, setSliderValues] = useState({
    temperature: 35,
    humidity: 60,
    soilMoisture: 45,
    oxygenLevel: 16,
    nitrogen: 20,
    phosphorus: 40,
    potassium: 60,
  });

  const popupRef = useRef(null); // Reference for the popup container

  const handleOperationChange = (tunnel, value) => {
    setOperationMode((prev) => ({
      ...prev,
      [tunnel]: value,
    }));
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  const handleSliderChange = (field, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Close the popup when clicking outside the popup container
  useEffect(() => {
    if (showPopup) {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setShowPopup(false); // Close the popup if clicked outside
        }
      };

      // Attach the event listener
      document.addEventListener("mousedown", handleClickOutside);

      // Clean up the event listener when the component is unmounted or the popup is closed
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showPopup]);

  return (
    <div className="home-container d-flex flex-column">
      <div className="d-flex flex-grow-1">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="main-content ms-5">
          <Topbar />
          <div className="content-wrapper p-3">
            <h1 className="dashboard-title text-center mb-4">Dashboard</h1>
            <div className="dashboard-section">
              <div className="tunnel-container mb-4">
                <div className="tunnel-header d-flex justify-content-between align-items-center bg-light p-3 rounded">
                  <span className="fw-bold">WELCOME!!</span>
                  <div>
                  
                    
                  </div>
                </div>

                <div className="dashboard-cards row g-3 mt-3">
                  {/* Cards for every experience with additional booster messages */}
                  {[{ title: "Content Delivery", value: "Uncover Secrets...", image: "temperature.jpg" },
                    { title: "Learning", value: "Level Up...", image: "humidity.jpg" },
                    { title: "Posts", value: "Hot Take...", image: "soil-moisture.jpg" },
                    { title: "Learning Plans", value: "Smart Growth...", image: "co2-level.png" },
                    { title: "Achievement Process", value: "Elite Progress...", image: "electrical-conductivity.jpg" },
                    { title: "User EXperience", value: "Effortless Joy...", image: "o2-level.jpg" }].map((card, index) => (
                    <div className="col-md-3" key={index}>
                      <div className="card h-100 shadow-sm text-center">
                        <img
                          src={`/src/assets/${card.image}`}
                          alt={card.title}
                          className="card-img-top p-3"
                        />
                        <div className="card-body">
                          <h5 className="card-title text-secondary">{card.title}</h5>
                          <p className="card-text fs-5 fw-bold">{card.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Pop-up for Manual Mode */}
    
    </div>
  );
};

export default Home;
