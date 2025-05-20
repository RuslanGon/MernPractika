
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../src/assets/logo.jpg";
import css from "./Navbar.module.css";


const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/register')    
    
  };

  return (
    <div className={css.container}>
      <img className={css.logo} src={logo} alt="logo" />

      <div className={css.div}>
        {isLoggedIn && (
          <>
            <Link className={css.link} to="/camper">Camper</Link>
            <button onClick={handleLogout} className={css.link}>Logout</button>
          </>
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
