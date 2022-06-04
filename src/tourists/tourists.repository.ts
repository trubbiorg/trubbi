import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Tourist } from './tourist.entity';

export class TouristsRepository extends EntityRepository<Tourist> {

}