import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("❌ MONGODB_URI not found in .env");
  }

  console.log("Testing MongoDB connection...");

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      connectTimeoutMS: 10000,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
