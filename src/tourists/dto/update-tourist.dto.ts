import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTouristDto {

  @IsNotEmpty()
  @IsString()
  name: string;
}
