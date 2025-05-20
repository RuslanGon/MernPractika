import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import css from './CamperDetails.module.css';

const CamperDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null); // индекс активного изображения

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        setCar(data);
      } catch (error) {
        console.error('Error loading camper:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setCurrentIndex(null);
  };

  const handleKeyDown = (e) => {
    if (currentIndex === null) return;

    if (e.key === 'Escape') {
      handleCloseModal();
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : car.gallery.length - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev < car.gallery.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    if (currentIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, car]);

  if (loading) return <p className={css.loading}>Loading...</p>;
  if (!car) return <p className={css.error}>Camper not found</p>;

  return (
    <div className={css.wrapper}>
      <Link to="/camper" className={css.backLink}>← Back to list</Link>
      <h1 className={css.title}>{car.name}</h1>

      <div className={css.gallery}>
        {car.gallery?.map((img, index) => (
          <img
            key={index}
            src={img.original}
            alt={`${car.name} ${index + 1}`}
            className={css.image}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <div className={css.info}>
        <p><strong>Price:</strong> ${car.price}</p>
        <p><strong>Rating:</strong> ⭐ {car.rating}</p>
        <p><strong>Location:</strong> 📍 {car.location}</p>
        <p><strong>Description:</strong> {car.description}</p>

        <h3>Specifications</h3>
        <ul className={css.specs}>
          <li><strong>Form:</strong> {car.form}</li>
          <li><strong>Length:</strong> {car.length}</li>
          <li><strong>Width:</strong> {car.width}</li>
          <li><strong>Height:</strong> {car.height}</li>
          <li><strong>Tank:</strong> {car.tank}</li>
          <li><strong>Consumption:</strong> {car.consumption}</li>
          <li><strong>Transmission:</strong> {car.transmission}</li>
          <li><strong>Engine:</strong> {car.engine}</li>
        </ul>

        <h3>Amenities</h3>
        <ul className={css.amenities}>
          <li>AC: {car.AC ? "Yes" : "No"}</li>
          <li>Bathroom: {car.bathroom ? "Yes" : "No"}</li>
          <li>Kitchen: {car.kitchen ? "Yes" : "No"}</li>
          <li>TV: {car.TV ? "Yes" : "No"}</li>
          <li>Radio: {car.radio ? "Yes" : "No"}</li>
          <li>Refrigerator: {car.refrigerator ? "Yes" : "No"}</li>
          <li>Microwave: {car.microwave ? "Yes" : "No"}</li>
          <li>Gas: {car.gas ? "Yes" : "No"}</li>
          <li>Water: {car.water ? "Yes" : "No"}</li>
        </ul>

        <Link to={`/camper/${car.id}/reviews`} className={css.reviews}>Reviews</Link>
      </div>

      {/* Модальное окно */}
      {currentIndex !== null && (
        <div className={css.modalOverlay} onClick={handleCloseModal}>
          <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={car.gallery[currentIndex].original}
              alt="Full view"
              className={css.modalImage}
            />
            <button onClick={handleCloseModal} className={css.closeBtn}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CamperDetails;
