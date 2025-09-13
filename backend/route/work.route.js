import express from "express";
import multer from "multer";
import {
  getAllWorks,
  createWork,
  updateWork,
  deleteWork,
  addItemToWork,
  editItem,
  deleteItem,
} from "../controller/WorkController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Work routes
router.get("/", getAllWorks);
router.post("/", upload.single("sampleImage"), createWork);
router.put("/:id", upload.single("sampleImage"), updateWork);
router.delete("/:id", deleteWork);

// Item routes
router.post("/:id/items", upload.single("image"), addItemToWork);
router.put("/:workId/items/:itemId", upload.single("image"), editItem);
router.delete("/:workId/items/:itemId", deleteItem);

export default router;
