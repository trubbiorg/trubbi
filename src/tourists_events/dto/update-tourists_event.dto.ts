import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristsEventDto } from './create-tourists_event.dto';

export class UpdateTouristsEventDto extends PartialType(CreateTouristsEventDto) {}
