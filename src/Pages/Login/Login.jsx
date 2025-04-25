import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import treeImage from "../../assets/tree.jpg";
import Footer from "../../Component/Footer/Footer";
 // Adjust the path based on your project structure

const Login = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="login-container d-flex align-items-center justify-content-center">
        <div className="login-box row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={treeImage} alt="Tree" className="tree-image" />
          </div>
          <div className="col-md-6 login-form">
            <h3 className="text-center mb-4">Please login to your account</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
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
              <button type="submit" className="btn btn-success w-100">
                Login
              </button>
              <div className="text-center mt-3">
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            </form>
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center align-items-center">
                <p className="mb-0">Don't have an account?</p>
                <button
                  className="btn btn-outline-success ml-3"
                  onClick={handleCreateAccount}
                >
                  Create New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
