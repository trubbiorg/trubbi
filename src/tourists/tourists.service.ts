import { HttpException, Injectable } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { TouristsRepository } from './tourists.repository';
import { CategoryRepository } from 'src/categories/category.repository';
import { CategoriesService } from 'src/categories/categories.service';
import { Console, debug } from 'console';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class TouristsService {
  constructor(
    private readonly repo: TouristsRepository,
    private readonly catRepo: CategoryRepository,
    private readonly categoryService: CategoriesService,
    private readonly eventService: EventsService) { }
    
    async create(createTouristDto: CreateTouristDto) {
      await this.repo.persistAndFlush(this.repo.create(createTouristDto));
    }
    
    findAll() {
      return this.repo.findAll();
    }
    
    async findOne(id: number) {
      const tourist = await this.repo.findOne(id);
      await tourist.events.init();
      await tourist.categories.init();
      console.log(tourist);
      if(!tourist){
        throw new HttpException("No se encontro el Turista solicitado.", 404);
      }
      
      return tourist;
    }

    async findAllEvents(){
      const tourist = await this.repo.findOne(1);
      if(!tourist){
        throw new HttpException("No se encontro el Turista solicitado.", 404);
      }
      await tourist.events.init();
      return tourist.events.length;
    }
    
  async findCategories(id:number){
    const tourist = await this.repo.findOne(id);
    if(!tourist){
      throw new HttpException("No se encontro el Turista solicitado.", 404);
    }
    await tourist.categories.init();
    return  tourist.categories;
  }
  
  update(id: number, updateTouristDto: UpdateTouristDto) {
    return `This action updates a #${id} tourist`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourist`;
  }

  //
  async addCategory(categoryID : number){
    //chequear que existe la categoría
    const category = await this.categoryService.findOne(categoryID);
    if(!category){
      throw new HttpException("No se encontro la Categoría solicitada.", 404);
    }
    //obtener el turista (hardcodeado porque en realidad es el turista logueado)
    const tourist = await this.repo.findOne(1);
    await tourist.categories.init();
    console.log(tourist);
    tourist.categories.add(category);
    this.repo.persistAndFlush(tourist);
    return tourist.name + ' subscripto exitosamente a ' + category.name
}

  async addEvent(eventId :number){
    const event = await this.eventService.findOne(eventId);
    if(!event){
      throw new HttpException("No se encontró el evento solicitado",404)
    }
    const tourist = await this.repo.findOne(1);
    await tourist.events.init();
    tourist.events.add(event);
    this.repo.persistAndFlush(tourist);
    return event.title + ' se añadió a los eventos de ' + tourist.name
  }

}
