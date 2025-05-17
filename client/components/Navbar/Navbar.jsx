import React from "react";
import logo from "../../src/assets/logo.jpg";
import css from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={css.container}>
      <img className={css.logo} src={logo} alt="logo" />
      <div className={css.div}>
      <Link className={css.link} to="/camper">Camper</Link>
        <Link className={css.link} to="/login">Login</Link>
        <Link className={css.link} to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
