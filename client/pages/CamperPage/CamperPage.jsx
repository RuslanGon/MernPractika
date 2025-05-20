import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./CamperPage.module.css";
import { Link } from "react-router-dom";

const CamperPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
        );
        setCars(data.items);
        console.log(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.wrapper}>
      <h1 className={css.heading}>Rental Campers</h1>
      {loading ? (
        <p className={css.loader}>Loading ...</p>
      ) : (
        <ul className={css.cardList}>
          {cars.map((car) => (
            <li key={car.id} className={css.card}>
              <Link to={`/camper/${car.id}`} className={css.cardLink}>
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CamperPage;
