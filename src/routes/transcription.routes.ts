import { Router } from "express";
import { TranscriptionController } from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription_create", TranscriptionController.create);
router.get("/get_transcription_by_id/:id", TranscriptionController.getById);

export default router;
