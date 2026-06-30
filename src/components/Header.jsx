import React from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const [btnName, setBtnName] = React.useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src={LOGO_URL}
          alt="Food App"
        />
      </div>

      <div className="nav-items">
        <ul>
          <li>🏠 Home</li>
          <li>ℹ️ About</li>
          <li>📞 Contact</li>
          <li>🛒 Cart</li>
          <button
            className="login-btn"
            onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
