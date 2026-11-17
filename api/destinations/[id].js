import app from "../../server/src/app.js";
import { connectDatabase } from "../../server/src/db.js";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error("TravelBharat destination API error:", error);
    return res.status(500).json({
      message: "API could not connect to the database."
    });
  }
}
