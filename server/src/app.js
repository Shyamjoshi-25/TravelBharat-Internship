import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import destinationRoutes from "./routes/destinations.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || true }));
app.use(express.json({ limit: "2mb" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", app: "TravelBharat API" }));
app.all("/api/debug-path", (req, res) => {
  res.json({
    method: req.method,
    originalUrl: req.originalUrl,
    url: req.url,
    baseUrl: req.baseUrl
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
export default app;
