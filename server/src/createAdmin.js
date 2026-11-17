import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });
const args = process.argv.slice(2);
const value = key => { const i = args.indexOf(key); return i >= 0 ? args[i + 1] : ""; };
const username = value("--username").trim().toLowerCase();
const email = value("--email").trim().toLowerCase();
const password = value("--password");
const name = value("--name") || "TravelBharat Admin";

if (!username || !password || password.length < 10) {
  console.error('Usage: npm run create-admin --prefix server -- --username admin --password AtLeast10Chars --name "TravelBharat Admin" [--email admin@example.com]');
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing. Set it in server/.env before creating the admin.");
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI);
const passwordHash = await bcrypt.hash(password, 12);
await Admin.findOneAndUpdate(
  { username },
  { name, username, ...(email ? { email } : {}), passwordHash },
  { upsert: true, new: true, runValidators: true }
);
console.log(`Admin account ready. Username: ${username}`);
await mongoose.disconnect();
