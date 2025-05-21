import express from "express";
import multer from 'multer';
import { createCamper, deleteCamper, getAllCampers, getOneCamper, updateCamper } from "../controllers/camper.js";


const router = express.Router();


// Настройка multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), createCamper);
router.get('/get', getAllCampers )
router.get('/:id', getOneCamper); 
router.delete('/:id', deleteCamper);
router.patch('/camper/:id', updateCamper)



export { router as camperRouter };