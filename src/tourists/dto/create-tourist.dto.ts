import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateTouristDto {

    @IsNotEmpty()
    @IsString()
    @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
