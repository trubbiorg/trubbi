import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { ScheduleService } from 'src/schedule/schedule.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { Opinion } from './opinion.entity';
import { OpinionsRepository } from './opinions.repository';

@Injectable()
export class OpinionsService {
  constructor(
    private readonly opinionRepository: OpinionsRepository,
    @Inject(forwardRef(() => ScheduleService))
    private readonly scheduleService: ScheduleService
  ) {}

  async create(jwtUserID: number, createOpinionDto: CreateOpinionDto) {
    const opinion: Opinion = this.opinionRepository.create(createOpinionDto);
    opinion.touristEvent = await this.scheduleService.findOne(jwtUserID, createOpinionDto.eventId);
    if(!opinion.touristEvent){
      throw new HttpException('No se encontro el evento a opinar', 404)
    }
    await this.opinionRepository.persistAndFlush(opinion);
    return opinion;
  }

  async findAllByEvent(eventId: number, offset: number) {
    const [opinions, count] = await this.opinionRepository.findAndCount({ touristEvent: { event: { id: eventId } } }, { populate: ["touristEvent.event"], limit: 10, offset: offset });
    return { opinions: opinions, page: offset/10+1, totalPages: Math.ceil(count/10) };
  }
}
