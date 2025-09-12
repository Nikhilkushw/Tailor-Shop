import Service from "../model/Services.js";

// 🔹 Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// 🔹 Add new service
export const addService = async (req, res) => {
  try {
    const { heading, description } = req.body;
    if (!heading || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({ heading, description });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: "Failed to add service" });
  }
};

// 🔹 Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { heading, description },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service" });
  }
};

// 🔹 Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service" });
  }
};
