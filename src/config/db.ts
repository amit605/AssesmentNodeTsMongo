import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI || '';
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};