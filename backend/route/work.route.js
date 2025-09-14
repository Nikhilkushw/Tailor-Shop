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
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};

const upload = multer({ storage, fileFilter });

// ✅ Work routes
router.get("/", getAllWorks);
router.post("/", upload.single("sampleImage"), createWork);
router.put("/:workId", upload.single("sampleImage"), updateWork);
router.delete("/:workId", deleteWork);

// ✅ Item routes
router.post("/:workId/items", upload.single("image"), addItemToWork);
router.put("/:workId/items/:itemId", upload.single("image"), editItem);
router.delete("/:workId/items/:itemId", deleteItem);

export default router;
