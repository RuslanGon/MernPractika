import express from "express";
import { createCamper, deleteCamper, getAllCampers, getOneCamper, updateCamper } from "../controllers/camper.js";


const router = express.Router();

router.post('/', createCamper)
router.get('/get', getAllCampers )
router.get('/:id', getOneCamper); 
router.delete('/:id', deleteCamper);
router.patch('/camper/:id', updateCamper)



export { router as camperRouter };