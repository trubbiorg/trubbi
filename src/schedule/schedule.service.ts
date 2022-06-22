import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { Event } from 'src/events/event.entity';
import { EventsService } from 'src/events/events.service';
import { Tourist } from 'src/tourists/tourist.entity';
import { TouristsService } from 'src/tourists/tourists.service';
import { TouristsEvent } from 'src/tourists/tourists_event.entity';
import { TouristsEventRepository } from 'src/tourists/tourists_event.repository';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly touristsEventRepository: TouristsEventRepository,
    private readonly touristService: TouristsService,
    @Inject(forwardRef(() => EventsService))
    private readonly eventService: EventsService
  ) {}

  async add(jwtUserId: number, eventId: number) {
    let touristsEvent: TouristsEvent = await this.findOne(jwtUserId, eventId);
    if(touristsEvent){
      touristsEvent.scheduled = true;
    }
    else{
      const tourist: Tourist = await this.touristService.findOne(jwtUserId, jwtUserId);
      const event: Event = await this.eventService.findOne(eventId);
      if(event.start_date <= getUnixTime(new Date()) || event.deleted_at != null || event.status != 'Activo' ){
        throw new HttpException('No puede agendar un evento inactivo', 400);
      }
      touristsEvent = this.touristsEventRepository.create({tourist, event, scheduled: true})
    }
    this.touristsEventRepository.persistAndFlush(touristsEvent);
    return touristsEvent;
  }

  findOne(touristId, eventId){
    return this.touristsEventRepository.findOne({tourist: { id: touristId }, event: { id: eventId }});
  }

  findAll(jwtUserId: number) {
    return this.touristsEventRepository.find({
      deleted_at: null,
      scheduled: true,
      tourist: { id: jwtUserId },
      event: { deleted_at: null, status: "Activo", start_date: { $gt: getUnixTime(new Date()) } }
    }, { populate: ['event'] });
  }

  getHistory(jwtUserId: number) {
    return this.touristsEventRepository.find({
      scheduled: true,
      tourist: { id: jwtUserId },
      event: { $or: [{ deleted_at: { $ne: null } }, { status: { $ne: "Activo"} }, { start_date: { $lt: getUnixTime(new Date()) }}] }
    }, { populate: ['event'] });
  }

  async remove(jwtUserId: number, eventId: number) {
    const touristsEvent: TouristsEvent = await this.findOne(jwtUserId, eventId);
    if(!touristsEvent){
      throw new HttpException('No se encontro el evento en la agenda', 404);
    }
    touristsEvent.scheduled = false;
    this.touristsEventRepository.persistAndFlush(touristsEvent);
    return touristsEvent;
  }
}
