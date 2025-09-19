import { IsString, IsUrl } from "class-validator";

export class CreateTranscriptionDto {
  @IsUrl({}, { message: "audioUrl must be a valid URL" })
  @IsString()
  audioUrl!: string;
}
