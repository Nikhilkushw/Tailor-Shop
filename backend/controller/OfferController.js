import Offer from "../model/Offers.js";

// Get all offers
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching offers", error });
  }
};

// Create new offer
export const createOffer = async (req, res) => {
  try {
    const { heading, description, validity } = req.body;
    const newOffer = new Offer({ heading, description, validity });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ message: "Error creating offer", error });
  }
};

// Update offer
export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOffer) return res.status(404).json({ message: "Offer not found" });
    res.json(updatedOffer);
  } catch (error) {
    res.status(500).json({ message: "Error updating offer", error });
  }
};

// Delete offer
export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting offer", error });
  }
};
