import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

import UserLogin from "./Pages/UserManagement/UserLogin";
import UserRegister from "./Pages/UserManagement/UserRegister";
import UpdateUserProfile from "./Pages/UserManagement/UpdateUserProfile";


import UserProfile from "./Pages/UserManagement/UserProfile";

import GoogalUserPro from "./Pages/UserManagement/GoogalUserPro";

import LikeComment from "./Pages/PostManagement/LikeComment";

function ProtectedRoute({ children }) {
  const userID = localStorage.getItem("userID");
  if (!userID) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/oauth2/success") {
      const params = new URLSearchParams(window.location.search);
      const userID = params.get("userID");
      const name = params.get("name");
      const googleProfileImage = decodeURIComponent(params.get("googleProfileImage")); // Decode the URL

      if (userID && name) {
        localStorage.setItem("userID", userID);
        localStorage.setItem("userType", "google");
        if (googleProfileImage) {
          localStorage.setItem("googleProfileImage", googleProfileImage); // Save decoded URL
        }
        navigate("/likeComment");
      } else {
        alert("Login failed. Missing user information.");
      }
    }
  }, [navigate]);

  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

          {/* Protected Routes */}
         
          <Route
            path="/updateUserProfile/:id"
            element={
              <ProtectedRoute>
                <UpdateUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/googalUserPro"
            element={
              <ProtectedRoute>
                <GoogalUserPro />
              </ProtectedRoute>
            }
          />
        
          
         
          <Route
            path="/likeComment"
            element={
              <ProtectedRoute>
                <LikeComment />
              </ProtectedRoute>
            }
          />
         
         
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;