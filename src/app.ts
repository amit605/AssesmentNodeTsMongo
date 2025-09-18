import express from "express";
import helmet from "helmet";

import transcriptionRoutes from "./routes/transcription.routes";

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/api", transcriptionRoutes);

export default app;
