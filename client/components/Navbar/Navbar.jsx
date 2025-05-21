import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../src/assets/logo.jpg";
import css from "./Navbar.module.css";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate('/register');
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };
//   console.log("Username from localStorage:", userName);
// console.log("Initials:", getInitials(userName));

  return (
    <div className={css.container}>
      <img className={css.logo} src={logo} alt="logo" />

      <div className={css.div}>
        {isLoggedIn && (
          <div className={css.div}>
            <Link className={css.link} to="/my">My camper</Link>
            <Link className={css.link} to="/add">Add camper</Link>
            <Link className={css.link} to="/camper">Camper</Link>
            <span className={css.initials}>{getInitials(userName)}</span>
            <button className={css.link} onClick={handleLogout}>Logout</button>
            
          </div>
        )}
        {!isLoggedIn && (
          <>
            <Link className={css.link} to="/login">Login</Link>
            <Link className={css.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
