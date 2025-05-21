import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import css from './EditPage.module.css';

const EditPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Загружаем текущие данные кемпера
    const fetchCamper = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/campers/${id}`);
        setName(data.name);
        setPrice(data.price);
        setRating(data.rating);
        setLocation(data.location);
        setDescription(data.description);
        setImage(data.image);
      } catch (error) {
        console.error('Failed to fetch camper:', error);
      }
    };

    fetchCamper();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.patch(
        `http://localhost:3001/campers/camper/${id}`,
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

      if (response.status === 200) {
        alert("Camper updated successfully!");
        navigate('/my');
      } else {
        alert("Failed to update camper. Please try again.");
      }
    } catch (error) {
      console.error('Failed to update camper:', error);
      setErrorMessage('Failed to update camper. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleEdit}>
      <h2 className={css.title}>Edit Camper</h2>

      {errorMessage && <p className={css.error}>{errorMessage}</p>}

      <div className={css.grid}>
        <div className={css.column}>
          <label className={css.field}>
            <span className={css.label}>Name</span>
            <input
              className={css.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
              required
            />
          </label>

          <label className={css.field}>
            <span className={css.label}>Price</span>
            <input
              className={css.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Enter price"
              required
            />
          </label>

          <label className={css.field}>
            <span className={css.label}>Rating</span>
            <input
              className={css.input}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              type="text"
              placeholder="Enter rating"
              required
            />
          </label>
        </div>

        <div className={css.column}>
          <label className={css.field}>
            <span className={css.label}>Location</span>
            <input
              className={css.input}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Enter location"
              required
            />
          </label>

          <label className={css.field}>
            <span className={css.label}>Description</span>
            <input
              className={css.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter description"
              required
            />
          </label>

          <label className={css.field}>
            <span className={css.label}>Image URL</span>
            <input
              className={css.input}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              placeholder="Paste image URL"
            />
          </label>
        </div>
      </div>

      <div className={css.buttonContainer}>
        <button type="submit" className={css.button}>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditPage;
