import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateTranscriptionDto } from "../validators/transcription.dto";
import { TranscriptionService } from "../services/transcription.service";

const service = new TranscriptionService();

export class TranscriptionController {

  static async create(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateTranscriptionDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({ errors: "invalid url" });
      }

      // Validate audio file format
      const audioExtensions = [".mp3", ".wav", ".ogg", ".aac", ".flac", ".m4a"];
      const audioExt = audioExtensions.some(ext => dto.audioUrl.toLowerCase().endsWith(ext));
      if (!audioExt) {
        return res.status(201).json({ message: "Invalid file type. Only audio files are allowed (mp3, wav, ogg, etc.)" });
      }

      const recordFind = await service.getTranscriptionBydata({ "audioUrl": dto.audioUrl });
      if (recordFind) {
        return res.status(201).json({ message: "Transcription url already exist. Please use another URL" });
      } else {
        const record = await service.createTranscription(dto.audioUrl);
        return res.status(201).json({ id: record._id });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const items = await service.listAll();
      return res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
