import { HttpException, Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { Event } from 'src/events/event.entity';
import { EventsService } from 'src/events/events.service';
import { Tourist } from 'src/tourists/tourist.entity';
import { TouristsService } from 'src/tourists/tourists.service';
import { TouristsEvent } from 'src/tourists/tourists_event.entity';
import { TouristsEventRepository } from 'src/tourists/tourists_event.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly touristsEventRepository: TouristsEventRepository,
    private readonly touristService: TouristsService,
    private readonly eventService: EventsService
  ) {}

  async add(jwtUserId: number, eventId: number) {
    let touristsEvent: TouristsEvent = await this.findOne(jwtUserId, eventId);
    if(touristsEvent){
      touristsEvent.favourite = true;
    }
    else{
      const tourist: Tourist = await this.touristService.findOne(jwtUserId, jwtUserId);
      const event: Event = await this.eventService.findOne(eventId);
      touristsEvent = this.touristsEventRepository.create({tourist, event, favourite: true})
    }
    this.touristsEventRepository.persistAndFlush(touristsEvent);
    return touristsEvent;
  }

  findOne(touristId, eventId){
    return this.touristsEventRepository.findOne({tourist: { id: touristId }, event: { id: eventId }});
  }

  findAll(jwtUserId: number) {
    return this.touristsEventRepository.find({
      favourite: true,
      tourist: { id: jwtUserId },
    }, { populate: ['event'] });
  }

  async remove(jwtUserId: number, eventId: number) {
    const touristsEvent: TouristsEvent = await this.findOne(jwtUserId, eventId);
    if(!touristsEvent){
      throw new HttpException('No se encontro el evento en la agenda', 404);
    }
    touristsEvent.favourite = false;
    this.touristsEventRepository.persistAndFlush(touristsEvent);
    return touristsEvent;
  }
}
