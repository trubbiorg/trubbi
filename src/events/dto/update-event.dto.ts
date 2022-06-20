import { ArrayUnique, IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/category.entity';

export class UpdateEventDto{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
