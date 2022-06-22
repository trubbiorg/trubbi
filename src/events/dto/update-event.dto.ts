import { ArrayUnique, IsArray, IsBoolean, IsIn, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Length, Matches, Min } from 'class-validator';
import { getUnixTime } from 'date-fns';
import { Category } from 'src/categories/category.entity';

export class UpdateEventDto{
  @IsNotEmpty()
  @IsString()
  @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
  title: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[A-Za-zÀ-ÿ\u00f1\u00d1\\s]*$')
  @Length(120, 205)
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
  @IsLongitude()
  latitude!: number;

  @IsNotEmpty()
  @IsLatitude()
  longitude!: number;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(getUnixTime(new Date()))
  start_date: number;

  @IsNotEmpty()
  @IsNumber()
  end_date: number;
}
