import { Injectable } from '@nestjs/common';
import { Event } from 'src/events/event.entity';
import { Tourist } from 'src/tourists/tourist.entity';
import { TouristsRepository } from 'src/tourists/tourists.repository';
import { CreateTouristsEventDto } from './dto/create-tourists_event.dto';
import { UpdateTouristsEventDto } from './dto/update-tourists_event.dto';
import { TouristsEventsRepository } from './tourists_events.repository';

@Injectable()
export class TouristsEventsService {
  constructor(
  ) {}
  // create(createTouristsEventDto: CreateTouristsEventDto) {
  //   return 'This action adds a new touristsEvent';
  // }

  // findAll() {
  //   return `This action returns all touristsEvents`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} touristsEvent`;
  // }

  // update(id: number, updateTouristsEventDto: UpdateTouristsEventDto) {
  //   return `This action updates a #${id} touristsEvent`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} touristsEvent`;
  // }
}
