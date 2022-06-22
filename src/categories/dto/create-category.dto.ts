import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    // @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
    name: string;
}
