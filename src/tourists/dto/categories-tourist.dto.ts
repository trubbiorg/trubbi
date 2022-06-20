import { ArrayUnique, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CategoriesTouristDto {

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  categoriesIds: number[];
}
