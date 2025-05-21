import axios from "axios";
import React, { useEffect, useState } from "react";

const MyCamperPage = () => {
  const [camper, setCamper] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3001/campers/get");
        console.log(data);
        setCamper(data);
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
      <h1>My camper</h1>
      <ul>
        <li>
          <h2>Name: </h2>
          <p>Price</p>
          <p>Rating:</p>
          <p>Location:</p>
          <p>Description:</p>
        </li>
      </ul>
    </div>
  );
};

export default MyCamperPage;
