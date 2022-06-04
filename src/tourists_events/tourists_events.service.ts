import { Injectable } from '@nestjs/common';
import { CreateTouristsEventDto } from './dto/create-tourists_event.dto';
import { UpdateTouristsEventDto } from './dto/update-tourists_event.dto';

@Injectable()
export class TouristsEventsService {
  create(createTouristsEventDto: CreateTouristsEventDto) {
    return 'This action adds a new touristsEvent';
  }

  findAll() {
    return `This action returns all touristsEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} touristsEvent`;
  }

  update(id: number, updateTouristsEventDto: UpdateTouristsEventDto) {
    return `This action updates a #${id} touristsEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} touristsEvent`;
  }
}
