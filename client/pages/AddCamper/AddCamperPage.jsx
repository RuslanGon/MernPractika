import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './AddCamperPage.module.css';

const AddCamperPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:3001/campers',
        {
          name,
          price,
          rating,
          location,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Camper added successfully!");
        navigate('/my');
      } else {
        alert("Failed to add camper. Please try again.");
      }
      console.log('Camper added:', response.data);
    } catch (error) {
      console.error('Failed to add camper:', error);
      setErrorMessage('Failed to add camper. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
    <h2 className={css.title}>Add Camper</h2>
  
    {errorMessage && <p className={css.error}>{errorMessage}</p>}
  
    <div className={css.grid}>
      <div className={css.column}>
        <label className={css.field}>
          <span className={css.label}>Name</span>
          <input className={css.input} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" required />
        </label>
  
        <label className={css.field}>
          <span className={css.label}>Price</span>
          <input className={css.input} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter price" required />
        </label>
  
        <label className={css.field}>
          <span className={css.label}>Rating</span>
          <input className={css.input} onChange={(e) => setRating(e.target.value)} type="text" placeholder="Enter rating" required />
        </label>
      </div>
  
      <div className={css.column}>
        <label className={css.field}>
          <span className={css.label}>Location</span>
          <input className={css.input} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter location" required />
        </label>
  
        <label className={css.field}>
          <span className={css.label}>Description</span>
          <input className={css.input} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter description" required />
        </label>
  
        <label className={css.field}>
          <span className={css.label}>Image URL</span>
          <input className={css.input} onChange={(e) => setImage(e.target.value)} type="text" placeholder="Paste image URL" />
        </label>
      </div>
    </div>
  
    <div className={css.buttonContainer}>
      <button type="submit" className={css.button}>
        Add Camper
      </button>
    </div>
  </form>
  );
};

export default AddCamperPage;
