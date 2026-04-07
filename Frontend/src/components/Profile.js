import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [showToken, setShowToken] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="profile-container">
      <h2>Your Account Information</h2>
      
      <div className="info-card">
        <div className="info-row">
          <label>User ID:</label>
          <code>{user?.id}</code>
        </div>
        <div className="info-row">
          <label>Name:</label>
          <code>{user?.name}</code>
        </div>
        <div className="info-row">
          <label>Email:</label>
          <code>{user?.email}</code>
        </div>
        <div className="info-row">
          <label>Token:</label>
          <button 
            onClick={() => setShowToken(!showToken)}
            className="toggle-btn"
          >
            {showToken ? "Hide" : "Show"} Token
          </button>
          {showToken && <code className="token">{token}</code>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
