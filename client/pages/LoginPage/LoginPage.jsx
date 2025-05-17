import React from 'react';
import { Link } from 'react-router-dom';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <form className={css.form}>
      <h2 className={css.title}>Login</h2>
      <label className={css.field}>
        <span className={css.label}>Name</span>
        <input
          className={css.input}
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
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </label>
      <button type="submit" className={css.button}>Login </button>
      <p className={css.redirect}> Already login?{' '}
        <Link to="/register" className={css.link}> Sign Up </Link>
      </p>
    </form>
  );
};

export default LoginPage;
