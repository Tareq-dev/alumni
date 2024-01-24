import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { authToken, removeToken } = useAuth();

  return (
    <div className="navbar border-b bg-base-100 md:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 rounded w-40"
          >
            <li className="pt-2">
              <Link to="/">Home</Link>
            </li>
            <li className="pt-2">
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li className="pt-2">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="pt-2">
              <Link to="/events">Event</Link>
            </li>
            <li className="pt-2">
              <Link to="/create-event">Create Event</Link>
            </li>
          </ul>
        </div>
        <a className="font-extrabold text-xl">Alumni SF</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="mx-2">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2">
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li className="mx-2">
            <Link to="/about-us">About Us</Link>
          </li>
          <li className="mx-2">
            <Link to="/events">Event</Link>
          </li>
          <li className="mx-2">
            <Link to="/create-event">Create Event</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!authToken ? (
          <Link
            to="/login"
            className="bg-yellow-400 px-4 py-1 rounded-md font-semibold cursor-pointer text-sm"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={removeToken}
            className="bg-yellow-400 px-4 py-1 rounded-md font-semibold cursor-pointer text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
