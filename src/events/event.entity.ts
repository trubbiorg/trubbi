import { Collection, Entity, Filter, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, types } from "@mikro-orm/core";
import { Category } from "../categories/category.entity";
import { Provider } from "../providers/provider.entity";
import { Tourist } from "../tourists/tourist.entity";
import { EventsRepository } from "./events.repository";
import { getUnixTime } from 'date-fns'
import { TouristsEvent } from "../tourists_events/tourists_event.entity";

@Entity({ customRepository: () => EventsRepository })
@Filter({ name: 'withoutDeleted', cond: { deleted_at: null } })
export class Event {
  @PrimaryKey()
  id: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @ManyToOne(() => Provider)
  provider!: Provider;

  @Property()
  latitude!: number;

  @Property()
  longitude!: number;

  @Property()
  photo!: string;

  @Property({ default: 'Activo' })
  status?: string;

  @Property({ type: types.integer, length: 11 })
  start_date!: number;

  @Property({ type: types.integer, length: 11 })
  end_date!: number;

  @ManyToMany(() => Tourist, tourist => tourist.events)
  tourists = new Collection<Tourist>(this);

  @OneToMany(() => TouristsEvent, touristsEvents => touristsEvents.event)
  touristsEvents = new Collection<TouristsEvent>(this);

  @ManyToMany(() => Category, 'events', { owner: true })
  categories = new Collection<Category>(this);

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()) })
  createdAt = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()) })
  updatedAt = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true })
  deleted_at?: number;
}

export const eventStatus = ['Activo', 'Cancelado', 'Finalizado'];
