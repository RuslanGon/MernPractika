import mongoose from "mongoose";

const camperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },

});

const CamperModel = mongoose.model("Camper", camperSchema);

export default CamperModel;