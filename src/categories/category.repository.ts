import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Category } from './category.entity';

export class CategoryRepository extends EntityRepository<Category> {

}