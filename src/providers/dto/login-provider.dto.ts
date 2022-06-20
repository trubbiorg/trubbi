import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginProviderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

