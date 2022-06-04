import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Admin } from './admin.entity';

export class AdminRepository extends EntityRepository<Admin> {

}