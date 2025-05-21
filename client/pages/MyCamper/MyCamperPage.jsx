import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from './MyCamperPage.module.css';

const MyCamperPage = () => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3001/campers/get");
        console.log(data);
        setCampers(data);
      } catch (error) {
        console.error("Failed to fetch campers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.heading}>My Campers</h1>
      {loading ? (
        <p className={css.loader}>Loading ...</p>
      ) : campers.length > 0 ? (
        <ul className={css.cardList}>
          {campers.map((camper) => (
            <li key={camper._id} className={css.card}>
              <Link to={`/camper/details/${camper._id}`} className={css.cardLink}>
                <div className={css.content}>
                  {camper.image && (
                    <img
                      src={`http://localhost:3001/${camper.image}`}
                      alt={camper.name}
                      className={css.image}
                    />
                  )}
                  <h2 className={css.title}>{camper.name}</h2>
                  <p className={css.price}>💰 Price: ${camper.price}</p>
                  <p>⭐ Rating: {camper.rating}</p>
                  <p>Description:{camper.description}</p>
                  <p className={css.location}>📍 Location: {camper.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noResults}>No campers found.</p>
      )}
    </div>
  );
};

export default MyCamperPage;
