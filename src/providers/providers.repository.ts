import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Provider } from './provider.entity';

export class ProviderRepository extends EntityRepository<Provider> {

}