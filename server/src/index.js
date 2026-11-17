import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./db.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });
const port = process.env.PORT || 5000;
connectDatabase()
  .then(() => app.listen(port, () => console.log(`TravelBharat API running on ${port}`)))
  .catch(error => { console.error("MongoDB connection failed:", error.message); process.exit(1); });
