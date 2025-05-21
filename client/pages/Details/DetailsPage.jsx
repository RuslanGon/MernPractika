import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi"; 
import { FiEdit } from "react-icons/fi";
import css from "./DetailsPage.module.css";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:3001/campers/${id}`);
        setCamper(data);
      } catch (error) {
        console.error("Error fetching camper details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) return <p className={css.loader}>Loading camper details...</p>;
  if (!camper) return <p className={css.error}>Camper not found.</p>;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/campers/${id}`);
      alert("Camper successfully deleted");
      navigate("/my");
    } catch (error) {
      console.error("Error deleting camper:", error);
      alert("Failed to delete camper");
    }
  };

  const handleEdit = () => {
   navigate('/edit')
  }

  return (
    <div className={css.container}>
      <button 
        className={css.backButton} 
        onClick={() => navigate("/my")}
      >
        ← Back
      </button>

      <div className={css.details}>
        {camper.image && <img src={camper.image} alt={camper.name} className={css.image} />}
        <div className={css.info}>
          <h1 className={css.title}>
            {camper.name} 
          
          </h1>
          <p><strong>Price:</strong> ${camper.price}</p>
          <p><strong>Rating:</strong> ⭐ {camper.rating}</p>
          <p><strong>Location:</strong> 📍 {camper.location}</p>
          <p><strong>Description:</strong> {camper.description}</p>
        </div>
       <div className={css.div}>
       <FiEdit className={css.editIcon} onClick={handleEdit}  /> 
        <FiTrash2 className={css.deleteIcon} onClick={handleDelete} />
       </div>
      </div>
    </div>
  );
};

export default DetailsPage;
