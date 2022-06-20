import { EntityRepository } from '@mikro-orm/mysql';
import { TouristsEvent } from './tourists_event.entity';

export class TouristsEventRepository extends EntityRepository<TouristsEvent> {

}