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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className={css.heading}>My camper</h1>
      {loading ? (
        <p className={css.loader}>Loading ...</p>
      ) : campers.length > 0 ? (
        <ul className={css.cardList}>
          {campers.map((camper) => (
            <li key={camper._id} className={css.card}>
              <Link to={`/camper/${camper._id}`} className={css.cardLink}>
                <div className={css.content}>
                  <h2 className={css.title}>{camper.name}</h2>
                  <p className={css.price}>Price: ${camper.price}</p>
                  <p>⭐ Rating: {camper.rating}</p>
                  <p>{camper.description}</p>
                  <p className={css.location}>📍 {camper.location}</p>
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
