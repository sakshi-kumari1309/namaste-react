import React, { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  return (
    <header className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-gray-700 bg-[#0f1115]/90 px-12 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://img.icons8.com/fluency/96/hamburger.png"
          alt="Namaste Foods"
          className="h-11 w-11"
        />

        <span className="hidden text-xl font-bold text-amber-400 md:block">
          NamasteFoods
        </span>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center gap-2">
          <li className="rounded-lg px-4 py-2 text-gray-400">
            {useOnlineStatus() ? "Online ✅" : "Offline 🔴"}
          </li>

          <li className="rounded-lg px-4 py-2 text-gray-400 transition hover:bg-[#171a21] hover:text-white">
            <Link to="/">Home</Link>
          </li>

          <li className="rounded-lg px-4 py-2 text-gray-400 transition hover:bg-[#171a21] hover:text-white">
            <Link to="/about">About</Link>
          </li>

          <li className="rounded-lg px-4 py-2 text-gray-400 transition hover:bg-[#171a21] hover:text-white">
            <Link to="/grocery">Grocery</Link>
          </li>

          <li className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-amber-400">
            🛒 Cart
          </li>

          <button
            className="cursor-pointer rounded-xl bg-amber-400 px-4 py-2 font-bold text-gray-900 transition hover:bg-amber-500"
            onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
          >
            {btnName}
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
