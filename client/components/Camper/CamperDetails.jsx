import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import css from './CamperDetails.module.css';

const CamperDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

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

        <h3>Reviews</h3>
        <ul className={css.reviews}>
          {car.reviews?.map((review, idx) => (
            <li key={idx} className={css.reviewItem}>
              <p><strong>{review.reviewer_name}</strong> — rating: {review.reviewer_rating} ⭐</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CamperDetails;
