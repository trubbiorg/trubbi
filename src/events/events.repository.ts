import { EntityRepository } from '@mikro-orm/mysql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Event } from './event.entity';

export class EventsRepository extends EntityRepository<Event> {

}