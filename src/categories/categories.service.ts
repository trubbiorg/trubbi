import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { getUnixTime } from 'date-fns'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.persistAndFlush(this.categoryRepository.create(createCategoryDto))
  }

  findAll() {
    return this.categoryRepository.findAll({ filters: ['withoutDeleted'] });
  }

  async findOne(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({id}, { filters: ['withoutDeleted'] });
    if(!category){
      throw new Error("No se encontro la Categoria");
    }
    return category;
  }

  async findEvents(id: number) { //: Promise<Collection<Event>> {
    const category: Category = await this.findOne(id);
    return category.events;
  }

  async findByIds(ids: number[]): Promise<Array<Category>> {
    return await this.categoryRepository.findAll({
      filters: { findByIds: { ids } },
    });
  }

  async remove(id: number) {
    const category: Category = await this.findOne(id);
    this.categoryRepository.assign(category, { deleted_at: getUnixTime(new Date()) })
    return this.categoryRepository.persistAndFlush(category);
  }
}
