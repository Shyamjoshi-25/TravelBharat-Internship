import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const loginId = (username || email || "").toLowerCase().trim();
    if (!loginId || !password) return res.status(400).json({ message: "Username/email and password are required." });
    const admin = await Admin.findOne({ $or: [{ username: loginId }, { email: loginId }] });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash)))
      return res.status(401).json({ message: "Invalid username/email or password." });
    const token = jwt.sign({ id: admin._id, username: admin.username, email: admin.email, name: admin.name }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, admin: { name: admin.name, username: admin.username, email: admin.email } });
  } catch (error) { res.status(500).json({ message: "Login failed.", error: error.message }); }
});

export default router;
