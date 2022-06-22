import { IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateOpinionDto {
  @IsNotEmpty()
  @IsString()
  @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
  title: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
  @Length(120, 205)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  eventId: number;
}
