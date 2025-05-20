import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./CamperPage.module.css";
import { Link } from "react-router-dom";

const CamperPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
        );
        setCars(data.items || data); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery) ||
    car.location.toLowerCase().includes(searchQuery)
  );

  return (
    <div className={css.wrapper}>
      <h1 className={css.heading}>Rental Campers</h1>

      <input
        type="text"
        placeholder="Search by name or location..."
        value={searchQuery}
        onChange={handleSearch}
        className={css.searchInput}
      />

      {loading ? (
        <p className={css.loader}>Loading ...</p>
      ) : (
        <ul className={css.cardList}>
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
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
            ))
          ) : (
            <p className={css.noResults}>No campers found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CamperPage;
