import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectToDB;