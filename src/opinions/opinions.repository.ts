import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Opinion } from './opinion.entity';

export class OpinionsRepository extends EntityRepository<Opinion> {

}