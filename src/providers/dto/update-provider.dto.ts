import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { providerStatus } from '../provider.entity';

export class UpdateProviderDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(providerStatus)
  status: string;
}

