import express from "express";
import {
  getAllWorks,
  createWork,
  updateWork,
  deleteWork,
  addItemToWork,
  editItem,
  deleteItem
} from "../controller/WorkController.js";

const router = express.Router();

router.get("/", getAllWorks);
router.post("/", createWork);
router.put("/:workId", updateWork);
router.delete("/:workId", deleteWork);

router.post("/:workId/items", addItemToWork);
router.put("/:workId/items/:itemId", editItem);
router.delete("/:workId/items/:itemId", deleteItem);

export default router;
