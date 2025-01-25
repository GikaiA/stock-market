import React, { useState } from "react";
import "./Login.css";
import stocks from "../images/stockanalysis.jpg";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      setError("");
      navigate("/dashboard"); // Redirect to a protected page
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="sidebar">
        <div className="sidenav-bgimage-wrapper">
          <div className="sidenav-img">
            <img src={stocks} alt="stocks-photo" className="side-img" />
          </div>
        </div>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <h2 className="login-title">Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
