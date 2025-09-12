import express from "express";
import { updateClothTypes, getGallery } from "../controller/ClothController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/manage-type",
  upload.fields([
    { name: "sampleImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateClothTypes
);
router.get("/gallery", getGallery);

export default router;
