import { Collection, QueryOrder } from '@mikro-orm/core';
import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { CategoriesService } from 'src/categories/categories.service';
import { Opinion } from '../opinions/opinion.entity';
import { TouristsEvent } from '../tourists/tourists_event.entity';
import { ProvidersService } from '../providers/providers.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';
import { EventsRepository } from './events.repository';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    @Inject(forwardRef(() => ProvidersService))
    private readonly providerService: ProvidersService,
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService
  ) {}

  async create(jwtUserId: number, createEventDto: CreateEventDto) {
    if(createEventDto.start_date >= createEventDto.end_date){
      throw new HttpException('La fecha de fin debe ser mayor a la fecha de inicio', 400);
    }
    createEventDto.provider = await this.providerService.findOne(jwtUserId, createEventDto.providerId);
    if(createEventDto.provider.status != "Aprobado"){
      throw new Error("No puede crear un evento para un proveedor inactivo.");
    }
    createEventDto.categories = await this.categoriesService.findByIds(createEventDto.categoriesIds);
    const event: Event = this.eventsRepository.create(createEventDto)
    await this.eventsRepository.persistAndFlush(event);
    return event;
  }

  // Traer todos los eventos ordenados por mas reciente y que pertenezca a las categorias del usuario logueado
  findAll(jwtUserId: number) {
    return this.eventsRepository.find({
      status: 'Activo',
      start_date: { $gt: getUnixTime(new Date()) },
      // categories: { tourists: { id: jwtUserId }, deleted_at: null }
    },
    {
      populate: ['provider', 'categories', 'categories.tourists'],
      filters: ['withoutEventsDeleted'],
      orderBy: { start_date: QueryOrder.ASC }
    });
  }

  findAllByName(name: string) {
    return this.eventsRepository.find({title: { $like: `%${name}%` },},
    {
      populate: ['provider', 'categories', 'categories.tourists'],
      filters: ['withoutEventsDeleted'],
      orderBy: { start_date: QueryOrder.ASC }
    });
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne({id}, { populate: ['categories', 'provider'] });
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    return event;
  }

  async findOpinions(jwtUserId: number, id: number) {
    const event: Event = await this.eventsRepository.findOne({id}, { populate: ['touristsEvents', 'touristsEvents.opinion'] });
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    if(event.provider.id != jwtUserId){
      throw new HttpException('No tiene permisos para ver este evento', 403);
    }

    event.touristsEvents.getItems().forEach((touristEvent: TouristsEvent) => {
      if(touristEvent.opinion){
        event.opinions.add(touristEvent.opinion);
      }
    });
    return event.opinions ?? { result: "No se encontraron opiniones" };
  }

  async findTourists(jwtUserId: number, id: number){
    const event: Event = await this.eventsRepository.findOne({id}, { populate: ['provider', 'tourists'] });
    if(event.provider.id != jwtUserId){
      throw new HttpException('No tiene permisos para ver este evento', 403);
    }
    return event.tourists;
  }

  findByCategory(id: number) {
    return this.eventsRepository.find({
      status: 'Activo',
      start_date: { $gt: getUnixTime(new Date()) },
      categories: { id: id }
    },
    {
      populate: ['provider', 'categories'],
      filters: ['withoutEventsDeleted'],
      orderBy: { start_date: QueryOrder.ASC }
    });
  }

  async update(jwtUserId: number, id: number, updateEventDto: UpdateEventDto) {
    if(updateEventDto.start_date >= updateEventDto.end_date){
      throw new HttpException('La fecha de fin debe ser mayor a la fecha de inicio', 400);
    }
    const event: Event = await this.eventsRepository.findOne({id}, { populate: ['provider', 'categories'], filters: ['withoutEventsDeleted'] });
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    if(event.provider.id != jwtUserId){
      throw new HttpException('No tiene permisos para ver este evento', 403);
    }
    const categories: Category[] = await this.categoriesService.findByIds(updateEventDto.categoriesIds);
    event.categories.getItems().map(category => {
      if(!categories.includes(category)){
        event.categories.remove(category);
      }
    });
    categories.map(category => {
      if(!event.categories.contains(category)){
        event.categories.add(category);
      }
    });
    this.eventsRepository.assign(event, updateEventDto);
    this.eventsRepository.persistAndFlush(event);
    return event;
  }

  async findAllByProvider(providerId: number, offset: number) {
    const [events, count] = await this.eventsRepository.findAndCount({ provider: { id: providerId } }, {
      limit: 10, offset: offset
    });
    return { events: events, page: offset/10+1, totalPages: Math.ceil(count/10) };
  }

  async remove(jwtUserId: number, id: number) {
    const event: Event = await this.eventsRepository.findOne({id}, { populate: ['provider'], filters: ['withoutEventsDeleted'] });
    if(!event){
      throw new HttpException( "No se encontro el Evento solicitado.", 404 );
    }
    if(event.provider.id != jwtUserId){
      throw new HttpException('No tiene permisos para ver este evento', 403);
    }
    console.log(event.start_date,  getUnixTime(new Date()))
    if(event.start_date <= getUnixTime(new Date())){
      throw new HttpException('No puede eliminar un evento ya comenzado o finalizado', 403);
    }
    this.eventsRepository.assign(event, { status: 'Cancelado', deleted_at: getUnixTime(new Date()) });
    this.eventsRepository.persistAndFlush(event);
    // await this.eventsRepository.removeAndFlush(event);
    return { result: "El evento fue eliminado con exito." }
  }
}
