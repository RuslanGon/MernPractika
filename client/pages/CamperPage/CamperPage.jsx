import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./CamperPage.module.css";

const CamperPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
        );
        setCars(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.wrapper}>
      <h1 className={css.heading}>Rental Campers</h1>
      <ul className={css.cardList}>
        {cars.map((car) => (
          <li key={car.id} className={css.card}>
            <img
              src={car.gallery?.[0]?.thumb || "/default-camper.jpg"}
              alt={car.name}
              className={css.image}
            />
            <div className={css.content}>
              <h2 className={css.title}>{car.name}</h2>
              <p className={css.price}>Price: ${car.price}</p>
              <p>⭐ Rating: {car.rating}</p>
              <p>{car.description}</p>
              <p className={css.location}>📍 {car.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CamperPage;
