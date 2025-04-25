import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Signup.css";
import treeImage from "../../assets/tree.jpg"; // Adjust based on the actual file name
import Footer from "../../Component/Footer/Footer"; // Import Footer

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLoginRedirect = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div>
      <div className="login-container d-flex align-items-center justify-content-center">
        <div className="login-box row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={treeImage} alt="Tree" className="tree-image" />
          </div>
          <div className="col-md-6 login-form">
            <h3 className="text-center mb-4">Create a new account</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Signup
              </button>
              <div className="text-center mt-3">
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            </form>
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center align-items-center">
                <p className="mb-0">Already have an account?</p>
                <button
                  className="btn btn-outline-success ml-3"
                  onClick={handleLoginRedirect}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Use Footer component */}
    </div>
  );
};

export default Signup;
