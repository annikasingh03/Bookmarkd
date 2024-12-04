import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Login.css"; // Your CSS file
import bookmarkd_icon from "./Assets/bookmarkd_title.png";
import mail_icon from "./Assets/mail.png";
import lock_icon from "./Assets/lock_icon.png";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSignUp = () => {
    // Reset error
    setError("");

    // Validate password
    if (password.length < 6 || !/\d/.test(password)) {
      setError("Password must be at least 6 characters long and include at least one digit.");
      return;
    }

    // If validation passes, change the action state to "Login"
    setAction("Login");
  };

  const handleLogin = () => {
    // Navigate to the home page
    navigate("/home");
  };

  return (
    <div className="bookmarkd_icon">
      <div className="bookmark">
        <img src={bookmarkd_icon} alt="" />
      </div>

      {/* Blue strip below bookmark */}
      <div className="blue-strip"></div>

      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={mail_icon} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={lock_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Display error message */}
        {error && <div className="error-message">{error}</div>}

        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>

        <div className="submit-container">
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={handleSignUp} // Perform validation for "Sign Up"
          >
            Sign Up
          </div>
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={handleLogin} // Navigate to home page for "Login"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
