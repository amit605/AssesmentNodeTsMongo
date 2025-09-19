import express from "express";
import helmet from "helmet";
import cors from 'cors';
import transcriptionRoutes from "./routes/transcription.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", transcriptionRoutes);

export default app;
