import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { EventsService } from '../events/events.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { providerStatus } from './provider.entity';
import { ProviderRepository } from './providers.repository';

@Injectable()
export class ProvidersService {
  constructor(
    private readonly providerRepository: ProviderRepository,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.persistAndFlush(this.providerRepository.create(createProviderDto));
  }

  findAll() {
    return this.providerRepository.findAll();
  }

  async findOne(id: number) {
    const provider = await this.providerRepository.findOne({id});
    if (!provider) {
      throw new HttpException( "No se encontro el Proveedor solicitado.", 404 );
    }
    return provider;
  }

  async findEvents(id: number) {
    const provider = await this.providerRepository.findOne({id}, { populate: ['events'], filters: ['withoutDeleted'] });
    return provider.events;
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    const provider = await this.findOne(id);
    this.providerRepository.assign(provider, updateProviderDto)
    return this.providerRepository.persistAndFlush(provider);
  }

  async updateStatus(id: number, newStatus: string) {
    const provider = await this.providerRepository.findOne({id});
    if(!providerStatus.includes(newStatus)){
      throw new Error("Status invalido");
    }
    if(['Aprobado'].includes(newStatus)){
      provider.deleted_at = null;
    }
    else if(!provider.deleted_at && ['Desaprobado', 'Dado de Baja'].includes(newStatus)){
      provider.deleted_at = getUnixTime(new Date());
    }
    this.providerRepository.assign(provider, {
      status: newStatus,
    })
    return this.providerRepository.persistAndFlush(provider);
  }

  async remove(id: number) {
    const provider = await this.providerRepository.findOne({id}, { populate: ['events'], filters: ['withoutDeleted'] });
    if (!provider) {
      throw new HttpException( "No se encontro el Proveedor solicitado.", 404 );
    }
    this.providerRepository.assign(provider, { deleted_at: getUnixTime(new Date()) })
    provider.events.toArray().map(event => event.id).map(this.eventsService.remove);
    this.providerRepository.assign(provider, { deleted_at: getUnixTime(new Date()) })
    return this.providerRepository.persistAndFlush(provider);
  }
}
