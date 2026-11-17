
import { Router } from "express";
import Destination from "../models/Destination.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { search = "", state = "", category = "" } = req.query;
    const filter = {};

    if (state) filter.state = state;
    if (category) filter.category = category;

    if (search) {
      filter.$or = ["name", "state", "city", "description"].map(key => ({
        [key]: { $regex: search, $options: "i" }
      }));
    }

    const items = await Destination.find(filter).sort({ featured: -1, name: 1 });
    res.json(items);
  } catch (error) {
    console.error("Load destinations error:", error);
    res.status(500).json({ message: "Could not load destinations.", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Destination.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Destination not found." });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid destination ID.", error: error.message });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const item = await Destination.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.error("Create destination error:", error);
    res.status(400).json({
      message: "Could not create destination.",
      error: error.message
    });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ message: "Destination not found." });
    res.json(item);
  } catch (error) {
    console.error("Update destination error:", error);
    res.status(400).json({
      message: "Could not update destination.",
      error: error.message
    });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Destination.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Destination not found." });
    res.json({ message: "Destination deleted." });
  } catch (error) {
    res.status(400).json({ message: "Invalid destination ID.", error: error.message });
  }
});

export default router;
