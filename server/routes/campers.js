import express from "express";
import { createCamper, deleteCamper, getAllCampers } from "../controllers/camper.js";


const router = express.Router();

router.post('/', createCamper)
router.get('/get', getAllCampers )
router.delete("/:id", deleteCamper);



export { router as camperRouter };