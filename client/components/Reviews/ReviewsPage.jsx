import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 используем useNavigate
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
  if (!car) return <p className={css.error}>Reviews not found</p>;

  return (
    <div className={css.wrapper}>
      <button onClick={() => navigate(-1)} className={css.backLink}>
        ← Back
      </button>

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
  );
};

export default ReviewsPage;
