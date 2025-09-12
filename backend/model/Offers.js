import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    validity: { type: String, required: true },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", OfferSchema);

export default Offer;
