import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './AddCamperPage.module.css';

const AddCamperPage = () => {
  const [name, setName] = useState('');    
  const [price, setPrice] = useState('');   
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('') 
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState('') 

  // const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Add camper</h2>

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
        <span className={css.label}>Price</span>
        <input
          className={css.input}
          onChange={e => setPrice(e.target.value)}
          type="text"
          name="price"
          placeholder="Enter your email"
          required
        />
      </label>
      <label className={css.field}>
        <span className={css.label}>Rating</span>
        <input
          className={css.input}
          onChange={e => setRating(e.target.value)}
          type="text"
          name="rating"
          placeholder="Enter your password"
          required
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Location</span>
        <input
          className={css.input}
          onChange={e => setLocation(e.target.value)}
          type="text"
          name="location"
          placeholder="location"
          required
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Description</span>
        <input
          className={css.input}
          onChange={e => setDescription(e.target.value)}
          type="text"
          name="description"
          placeholder="description"
          required
        />
      </label>
      <label className={css.field}>
        <span className={css.label}>Image</span>
        <input
          className={css.input}
          onChange={e => setRating(e.target.value)}
          type="img"
          name="image"
          placeholder="image"
        />
      </label>

      <button type="submit" className={css.button}>
      Add camper
      </button>
    </form>
  );
};

export default AddCamperPage;
