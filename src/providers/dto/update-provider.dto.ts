import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { providerStatus } from '../provider.entity';

export class UpdateProviderDto {

  @IsNotEmpty()
  @IsString()
  // @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(providerStatus)
  status: string;
}

