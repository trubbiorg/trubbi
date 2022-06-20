import { HttpException, Injectable } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { TouristsRepository } from 'src/tourists/tourists.repository';
import { CategoriesService } from 'src/categories/categories.service';
import { EventsService } from 'src/events/events.service';
import { Event } from 'src/events/event.entity';
import { Collection } from '@mikro-orm/core';
import { getUnixTime } from 'date-fns'
import { LoginTouristDto } from './dto/login-tourist.dto';
import { Role } from 'src/auth/role.enum';
import { JwtService } from '@nestjs/jwt';
import { CategoriesTouristDto } from './dto/categories-tourist.dto';


@Injectable()
export class TouristsService {
  constructor(
    private readonly repo: TouristsRepository,
    private readonly categoryService: CategoriesService,
    private jwtService: JwtService,
    private readonly eventService: EventsService) { }

  async create(createTouristDto: CreateTouristDto) {
    let tourist = await this.repo.findOne({ email: createTouristDto.email });
    if(tourist){
      throw new HttpException("El usuario ya existe", 400);
    }
    tourist = this.repo.create(createTouristDto);
    await this.repo.persistAndFlush(tourist);
    return tourist;
  }

  async login(body: LoginTouristDto){
    const user = await this.repo.findOne({ email: body.email });
    if (user && user.password === body.password) {
      const payload = { email: user.email, id: user.id, role: Role.Tourist };
      return {access_token: this.jwtService.sign(payload)};
    }
    throw new HttpException("Credenciales Invalidas", 401);
  }

  async findOne(jwtUserId: number, id: number) {
    const tourist = await this.repo.findOne({id}, { filters: ["withoutDeleted"] });
    if(!tourist){
      throw new HttpException("No se encontro el Turista solicitado.", 404);
    }
    if(tourist.id != jwtUserId){
      throw new HttpException("No Tiene permisos sobre el turista solicitado.", 404);
    }
    return tourist;
  }

  async update(jwtUserId: number, id: number, updateTouristDto: UpdateTouristDto) {
    const tourist = await this.findOne(jwtUserId, id);
    this.repo.assign(tourist, updateTouristDto);
    this.repo.persistAndFlush(tourist);
    return tourist;
  }

  async remove(jwtUserId: number, id: number) {
    const tourist = await this.findOne(jwtUserId, id);
    this.repo.assign(tourist, { deleted_at: getUnixTime(new Date()) });
    this.repo.persistAndFlush(tourist);
    return tourist;
  }

  async setCategories(jwtUserId: number, categoriesTouristDto: CategoriesTouristDto){
    const tourist = await this.repo.findOne({ id: jwtUserId }, { populate: ['categories'] });
    const categories = await this.categoryService.findByIds(categoriesTouristDto.categoriesIds);
    tourist.categories.getItems().map(category => {
      if(!categories.includes(category)){
        tourist.categories.remove(category);
      }
    });
    categories.map(category => {
      if(!tourist.categories.contains(category)){
        tourist.categories.add(category);
      }
    });
    this.repo.persistAndFlush(tourist);
    return tourist;
  }

  async findCategories(jwtUserId:number){
    console.log("LLEGO");
    const tourist = await this.repo.findOne({ id: jwtUserId }, { populate: ['categories'] });
    return tourist.categories;
  }
}
