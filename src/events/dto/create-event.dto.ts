import { IsDateString, IsInt, IsString } from 'class-validator';
import { Provider } from 'src/providers/provider.entity';

export class CreateEventDto {

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsInt()
  providerId!: number;
  
  provider: Provider;

  @IsString()
  address!: string;
  
  @IsString()
  photo!: string;

  @IsDateString()
  start_date!: string;

  @IsDateString()
  end_date!: string;
}
