import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { getUnixTime } from 'date-fns'
import { EventsService } from 'src/events/events.service';
import { Event } from 'src/events/event.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject(forwardRef(() => EventsService))
    private readonly eventService: EventsService
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category: Category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  findAll() {
    return this.categoryRepository.findAll({ filters: ['withoutDeleted'] });
  }

  async findOne(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({id}, { filters: ['withoutDeleted'] });
    if(!category){
      throw new HttpException("No se encontro la Categoria", 404);
    }
    return category;
  }

  async findEvents(id: number) {
    return await this.eventService.findByCategory(id);
  }

  async findByIds(ids: number[]): Promise<Array<Category>> {
    const categories: Category[] = await this.categoryRepository.findAll({
      filters: { findByIds: { ids }, withoutDeleted: true },
    });
    if(categories.length != ids.length){
      throw new HttpException('No se encontro una de las categorias', 404);
    }
    return categories;
  }

  async remove(id: number) {
    const category: Category = await this.findOne(id);
    this.categoryRepository.assign(category, { deleted_at: getUnixTime(new Date()) })
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }
}
