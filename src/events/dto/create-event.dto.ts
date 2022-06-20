import { ArrayUnique, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Provider } from 'src/providers/provider.entity';

export class CreateEventDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  providerId: number;

  provider: Provider;

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  // @IsNumber(null, { each: true })
  categoriesIds: number[];

  categories: Array<Category>;

  @IsNotEmpty()
  @IsBoolean()
  public: boolean;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsNumber()
  latitude!: number;

  @IsNotEmpty()
  @IsNumber()
  longitude!: number;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsNumber()
  start_date: number;

  @IsNotEmpty()
  @IsNumber()
  end_date: number;
}
