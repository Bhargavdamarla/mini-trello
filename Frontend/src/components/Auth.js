import React, { useState, useContext } from "react";
import { login, signup } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: contextLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      if (!email.trim()) {
        setError("Please enter your email");
        setLoading(false);
        return;
      }
      if (!password.trim()) {
        setError("Please enter your password");
        setLoading(false);
        return;
      }
      if (!isLogin && !name.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }

      let response;
      if (isLogin) {
        response = await login(email, password);
      } else {
        response = await signup(email, password, name);
      }

      const { token, email: userEmail, name: userName, userId } = response.data;
      contextLogin({ email: userEmail, name: userName, id: userId }, token);
    } catch (err) {
      // Extract error message from different sources
      let errorMsg = "Authentication failed";

      if (err.response?.status === 400) {
        errorMsg = "Invalid credentials. Please check your email and password.";
      } else if (err.response?.status === 409) {
        errorMsg = "This email is already registered. Please login instead.";
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.data) {
        errorMsg = typeof err.response.data === "string" 
          ? err.response.data 
          : "Authentication failed";
      } else if (err.message === "Network Error") {
        errorMsg = "Cannot connect to server. Make sure the backend is running.";
      } else if (err.code === "ERR_NETWORK") {
        errorMsg = "Network error. Please check your connection.";
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Mini Trello</h1>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="toggle-btn"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
