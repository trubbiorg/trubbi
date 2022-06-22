import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { Opinion } from './opinion.entity';
import { OpinionsRepository } from './opinions.repository';

@Injectable()
export class OpinionsService {
  constructor(
    private readonly opinionRepository: OpinionsRepository,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService
  ) {}

  async create(createOpinionDto: CreateOpinionDto) {
    const opinion: Opinion = this.opinionRepository.create(createOpinionDto);
    await this.opinionRepository.persistAndFlush(opinion);
    return opinion;
  }

  findAllByEvent(eventId: number, offset: number) {
    return this.opinionRepository.find({ touristEvent: { event: { id: eventId } } }, { populate: ["touristEvent.event"], limit: 10, offset: offset })
  }
}
