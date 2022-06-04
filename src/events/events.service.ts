import { Injectable } from '@nestjs/common';
import { ProvidersService } from '../providers/providers.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository, private readonly providerService: ProvidersService) {}

  async create(createEventDto: CreateEventDto) {
    createEventDto.provider = await this.providerService.findOne(createEventDto.providerId);
    this.eventsRepository.persistAndFlush(this.eventsRepository.create(createEventDto));
  }

  findAll() {
    return `This action returns all events`;
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne(id);
    return event;
    //return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    const event = await this.eventsRepository.findOne(id);
    return await this.eventsRepository.removeAndFlush(event);
  }
}
