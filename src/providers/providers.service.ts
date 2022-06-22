import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUnixTime } from 'date-fns';
import { Role } from 'src/auth/role.enum';
import { EventsService } from '../events/events.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { LoginProviderDto } from './dto/login-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider, providerStatus } from './provider.entity';
import { ProviderRepository } from './providers.repository';

@Injectable()
export class ProvidersService {
  constructor(
    private readonly providerRepository: ProviderRepository,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private jwtService: JwtService,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    let provider = await this.providerRepository.findOne({ email: createProviderDto.email });
    if(provider){
      throw new HttpException("El usuario ya existe", 400);
    }
    provider = this.providerRepository.create(createProviderDto);
    await this.providerRepository.persistAndFlush(provider);
    return provider;
  }

  async login(body: LoginProviderDto){
    const user = await this.providerRepository.findOne({ email: body.email, deleted_at: null, status: 'Aprobado' });
    if (user && user.password === body.password) {
      const payload = { email: user.email, id: user.id, role: Role.Provider };
      return {'access_token': this.jwtService.sign(payload), 'expired': getUnixTime(new Date()) + 86400};
    }
    throw new HttpException("Credenciales Invalidas", 401);
  }

  findAll() {
    return this.providerRepository.findAll();
  }

  async findOne(jwtUserId: number, id: number) {
    const provider = await this.providerRepository.findOne({id}, { filters: ['withoutProvidersDeleted'] });
    if (!provider) {
      throw new HttpException("No se encontro el Proveedor solicitado.", 404 );
    }
    if(jwtUserId != provider.id){
      throw new HttpException("No tiene permisos sobre el Proveedor solicitado", 403)
    }
    return provider;
  }

  async update(jwtUserId: number, id: number, updateProviderDto: UpdateProviderDto) {
    const provider = await this.findOne(jwtUserId, id);
    this.providerRepository.assign(provider, updateProviderDto)
    this.providerRepository.persistAndFlush(provider);
    return provider;
  }

  async updateStatus(id: number, newStatus: string) {
    const provider = await this.providerRepository.findOne({id}, { populate: ['events'] });
    if (!provider) {
      throw new HttpException( "No se encontro el Proveedor solicitado.", 404 );
    }
    if(!providerStatus.includes(newStatus)){
      throw new Error("Status invalido");
    }
    if(['Aprobado'].includes(newStatus)){
      provider.events.getItems().map((event) => {
        if(event.start_date > getUnixTime(new Date())){
          event.status = 'Cancelado';
          event.deleted_at = getUnixTime(new Date());
        }
      });
      provider.deleted_at = null;
    }
    else if(!provider.deleted_at && ['Desaprobado', 'Dado de Baja'].includes(newStatus)){
      provider.deleted_at = getUnixTime(new Date());
    }
    this.providerRepository.assign(provider, {
      status: newStatus,
    })
    await this.providerRepository.persistAndFlush(provider);
    return provider;
  }
}
