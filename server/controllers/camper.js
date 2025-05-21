import CamperModel from '../models/Camper.js'

export const createCamper = async (req, res) => {
  try {
    const { name, price, rating, location, description } = req.body;
    const imagePath = req.file ? req.file.path : '';

    const camper = new CamperModel({
      name,
      price,
      rating,
      location,
      description,
      image: imagePath,
    });

    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    console.error('Error adding camper:', error);
    res.status(500).json({ error: 'Failed to add camper' });
  }
};

export const getAllCampers = async (req, res) => {
    try {
      const campers = await CamperModel.find();
      res.status(200).json(campers);
    } catch (error) {
      console.error('Error fetching campers:', error);
      res.status(500).json({ error: 'Failed to fetch campers' });
    }
  }  

export const deleteCamper =  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCamper = await CamperModel.findByIdAndDelete(id);
  
      if (!deletedCamper) {
        return res.status(404).json({ error: 'Camper not found' });
      }
  
      res.status(200).json({ message: 'Camper deleted successfully' });
    } catch (error) {
      console.error('Error deleting camper:', error);
      res.status(500).json({ error: 'Failed to delete camper' });
    }
  } 

  export const updateCamper = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCamper = await CamperModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true, 
      });
  
      if (!updatedCamper) {
        return res.status(404).json({ error: 'Camper not found' });
      }
  
      res.status(200).json(updatedCamper);
    } catch (error) {
      console.error('Error updating camper:', error);
      res.status(500).json({ error: 'Failed to update camper' });
    }
  };

  export const getOneCamper = async (req, res) => {
    try {
      const camper = await CamperModel.findById(req.params.id);
      if (!camper) {
        return res.status(404).json({ error: "Camper not found" });
      }
      res.status(200).json(camper);
    } catch (error) {
      console.error("Error fetching camper:", error);
      res.status(500).json({ error: "Failed to fetch camper" });
    }
  };