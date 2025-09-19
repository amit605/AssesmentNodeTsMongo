import { Router } from "express";
import { TranscriptionController } from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription_create", TranscriptionController.create);
router.get('/list_all', TranscriptionController.list);
export default router;
