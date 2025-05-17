import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');    
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !email) {
      setErrorMessage("Name, email and password are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/register",
        { name, email, password },
        // { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.registered) {
        setErrorMessage('');
        navigate('/login');
      } else {
        setErrorMessage('Registration failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        "Registration failed. User may already exist.";
      setErrorMessage(msg);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Register</h2>

      {errorMessage && <p className={css.error}>{errorMessage}</p>}

      <label className={css.field}>
        <span className={css.label}>Name</span>
        <input
          className={css.input}
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Email</span>
        <input
          className={css.input}
          onChange={e => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Password</span>
        <input
          className={css.input}
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </label>

      <button type="submit" className={css.button}>
        Sign Up
      </button>

      <p className={css.redirect}>
        Already registered?{' '}
        <Link to="/login" className={css.link}>
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
