import { HttpException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './provider.entity';
import { ProviderRepository } from './providers.repository';
import { EventsRepository } from '../events/events.repository';

@Injectable()
export class ProvidersService {
  constructor(private readonly repo: ProviderRepository) {}
  
  async create(createProviderDto: CreateProviderDto) {
    await this.repo.persistAndFlush(this.repo.create(createProviderDto));
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const provider = await this.repo.findOne(id);
    console.log(provider);
    if (!provider) {
      throw new HttpException( "No se encontro el Proveedor solicitado.", 404 );
    }
    return provider;
  }

  async findEvents(id: number) {
    const provider = await this.repo.findOne(id, { populate: ['events'] });
    return provider.events;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
