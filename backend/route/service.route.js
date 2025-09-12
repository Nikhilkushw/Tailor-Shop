import express from "express";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../controller/ServiceController.js";

const router = express.Router();

router.get("/", getServices);       // Get all services
router.post("/", addService);       // Add new service
router.put("/:id", updateService);  // Update service
router.delete("/:id", deleteService); // Delete service

export default router;
