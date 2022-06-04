import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { TouristsEvent } from './tourists_event.entity';

export class TouristsEventsRepository extends EntityRepository<TouristsEvent> {

}