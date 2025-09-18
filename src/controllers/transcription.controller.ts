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
        return res.status(400).json({ errors });
      }

      const recordFind = await service.getTranscriptionById({ "audioUrl": dto.audioUrl });
      
      if (recordFind) {
        return res.status(201).json({ message: "Transcription url already exist" });
      } else {
        const record = await service.createTranscription(dto.audioUrl);
        return res.status(201).json({ id: record._id });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await service.getTranscriptionById({ "_id": id });
      if (!record) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
