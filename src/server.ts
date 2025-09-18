import "reflect-metadata";
import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});