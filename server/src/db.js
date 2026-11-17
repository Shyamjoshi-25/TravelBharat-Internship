import mongoose from "mongoose";

// Reuse the connection between Vercel serverless invocations.
let cached = globalThis.__travelBharatMongo;
if (!cached) {
  cached = globalThis.__travelBharatMongo = { conn: null, promise: null };
}

export async function connectDatabase() {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI environment variable is missing.");
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000
    }).then(m => m).catch(error => {
      cached.promise = null;
      throw error;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
