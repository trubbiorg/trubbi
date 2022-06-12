import { HttpException, Injectable } from '@nestjs/common';
import { ProvidersService } from '../providers/providers.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository, private readonly providerService: ProvidersService) {}

  async create(createEventDto: CreateEventDto) {
    const provider = await this.providerService.findOne(createEventDto.providerId);
    if(!provider){
      throw new HttpException("No se encontro el Turista solicitado.", 404);
    }
    createEventDto.provider = provider;
    this.eventsRepository.persistAndFlush(this.eventsRepository.create(createEventDto));
  }

  findAll() {
    return this.eventsRepository.findAll();
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne(id);
    if(!event){
      throw new HttpException("No se encontró el evento solicitado",404);
    }
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    const event = await this.findOne(id);
        return await this.eventsRepository.removeAndFlush(event);
  }
}
