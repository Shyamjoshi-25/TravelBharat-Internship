import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ["Heritage", "Nature", "Adventure", "Religious", "Beach", "Wildlife", "Culture"] },
  description: { type: String, required: true },
  bestTime: { type: String, default: "October to March" },
  entryFee: { type: String, default: "Please check locally" },
  locationUrl: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  nearbyAttractions: [{ type: String }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Destination", destinationSchema);
