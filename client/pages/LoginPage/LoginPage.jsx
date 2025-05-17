import React, { useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import css from './LoginPage.module.css';
import axios from 'axios';

const LoginPage = () => {
  const [name, setName] = useState('');    
  const [password, setPassword] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setErrorMessage("Name and password are required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        { name, password }
      );

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/')

        setErrorMessage('');
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            window.location.reload();   
          }
      } else {
        setErrorMessage('Login failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h2 className={css.title}>Login</h2>

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
        Login
      </button>

      <p className={css.redirect}>
        Don't have an account?{' '}
        <Link to="/register" className={css.link}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
