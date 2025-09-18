import Transcription, { ITranscription } from "../models/transcription.model";

export class TranscriptionService {
  async createTranscription(audioUrl: string): Promise<ITranscription> {
    const dummyText = "transcribed text";
    const newTranscription = new Transcription({
      audioUrl,
      transcription: dummyText,
      createdAt: new Date()
    });

    return await newTranscription.save();
  }

  async getTranscriptionById(data: object): Promise<ITranscription | null> {
    return await Transcription.findOne(data);
  }
}
