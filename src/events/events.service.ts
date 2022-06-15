import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { ProvidersService } from '../providers/providers.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    @Inject(forwardRef(() => ProvidersService))
    private readonly providerService: ProvidersService,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(createEventDto: CreateEventDto) {
    createEventDto.provider = await this.providerService.findOne(createEventDto.providerId);
    if(createEventDto.provider.status != "Aprobado"){
      throw new Error("No puede crear un evento para un proveedor inactivo.");
    }
    createEventDto.categories = await this.categoriesService.findByIds(createEventDto.categoriesIds);
    return this.eventsRepository.persistAndFlush(this.eventsRepository.create(createEventDto));
  }

  findAll() {
    return this.eventsRepository.findAll({ filters: ['withoutDeleted'] });
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne(id, { populate: ['tourists', 'categories', 'provider'] });
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    return event;
  }

  async findOpinions(id: number) {
    const event = await this.eventsRepository.findOne(id);
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    console.log(event);
    // return event.o;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    updateEventDto.categories = await this.categoriesService.findByIds(updateEventDto.categoriesIds);
    return this.eventsRepository.persistAndFlush(this.eventsRepository.create({...updateEventDto, id}));
  }

  async remove(id: number) {
    const event = await this.eventsRepository.findOne(id);
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    return await this.eventsRepository.removeAndFlush(event);
  }
}
