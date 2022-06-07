import { HttpException, Injectable } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { TouristsRepository } from './tourists.repository';
import { CategoryRepository } from 'src/categories/category.repository';

@Injectable()
export class TouristsService {
  constructor (private readonly repo: TouristsRepository , private readonly catRepo: CategoryRepository ){}
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

  async findCategories(id:number){
    const tourist = await this.repo.findOne(id);
    if(!tourist){
      throw new HttpException("No se encontro el Turista solicitado.", 404);
    }
    return  tourist.categories;
  }
  
  update(id: number, updateTouristDto: UpdateTouristDto) {
    return `This action updates a #${id} tourist`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourist`;
  }

  // ERROR [ExceptionsHandler] Cannot read properties of undefined (reading 'getContext')
  async checkIfCategoryExistst(idcategory:number){
    const catFound =  await this.catRepo.find(idcategory);
    if(!catFound){
      throw new HttpException("No se encontro la Categoría solicitada.", 404);
    }
    return catFound;
  }

  //pincha cuando llama al método este de arriba (ver error)
  async addCategory(categoryID : number){
    const category = await this.checkIfCategoryExistst(categoryID);
    if(!category){
      throw new HttpException("No se encontro la Categoría solicitada.", 404);
    }
    return 'Subscripto a la categoría exitosamente'
  }
}
