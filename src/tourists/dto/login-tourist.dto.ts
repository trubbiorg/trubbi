import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginTouristDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

