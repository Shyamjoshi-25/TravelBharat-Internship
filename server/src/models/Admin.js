import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  email: { type: String, lowercase: true, trim: true, sparse: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
