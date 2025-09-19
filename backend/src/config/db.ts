import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


//// connnection with mongodb-memory-server
export const connectDB = async () => {
  let mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
  console.log("MongoDB connected successfully");
};

//// If you  want to connect with locally then please uncomment this code
// export const connectDB = async () => {
//   try {
//     let mongoUri = process.env.MONGO_URI || '';
//     await mongoose.connect(mongoUri);
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection failed", err);
//     process.exit(1);
//   }
// };

