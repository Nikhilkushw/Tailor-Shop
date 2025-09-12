import express from "express";
import {
  getWorkImages,
  createWorkImage,
  updateWorkImage,
  deleteWorkImage,
} from "../controller/WorkController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Multiple files upload: sampleImage + items[]
router.get("/", getWorkImages);
router.post(
  "/",
  upload.fields([
    { name: "sampleImage", maxCount: 1 },
    { name: "items", maxCount: 10 },
  ]),
  createWorkImage
);
router.put(
  "/:id",
  upload.fields([
    { name: "sampleImage", maxCount: 1 },
    { name: "items", maxCount: 10 },
  ]),
  updateWorkImage
);
router.delete("/:id", deleteWorkImage);

export default router;
