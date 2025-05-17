import React from 'react';
import { Link } from 'react-router-dom';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <form className={css.form}>
      <h2 className={css.title}>Register</h2>
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
        <span className={css.label}>Email</span>
        <input
          className={css.input}
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
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </label>
      <button type="submit" className={css.button}> Sign Up</button>
      <p className={css.redirect}> Already registered?{' '}
        <Link to="/login" className={css.link}> Login here</Link>
      </p>
    </form>
  );
};

export default RegisterPage;
