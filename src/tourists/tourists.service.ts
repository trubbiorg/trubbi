import { HttpException, Injectable } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { TouristsRepository } from './tourists.repository';
import { CategoryRepository } from 'src/categories/category.repository';
import { CategoriesService } from 'src/categories/categories.service';
import { Console, debug } from 'console';

@Injectable()
export class TouristsService {
  constructor(
    private readonly repo: TouristsRepository,
    private readonly catRepo: CategoryRepository,
    private readonly categoryService: CategoriesService) { }

  async create(createTouristDto: CreateTouristDto) {
    await this.repo.persistAndFlush(this.repo.create(createTouristDto));
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const provider = await this.repo.findOne(id);
    console.log(provider);
    if(!provider){
      throw new HttpException("No se encontro el Turista solicitado.", 404);
    }
    return provider;
  }

  async findEvents(id: number) {
    const tourist = await this.repo.findOne(id, { populate: ['events'] });
    return tourist.events;
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
}
