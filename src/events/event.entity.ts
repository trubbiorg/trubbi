import { Collection, Entity, Filter, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, types } from "@mikro-orm/core";
import { Category } from "../categories/category.entity";
import { Provider } from "../providers/provider.entity";
import { Tourist } from "../tourists/tourist.entity";
import { EventsRepository } from "./events.repository";
import { getUnixTime } from 'date-fns'
import { TouristsEvent } from "../tourists/tourists_event.entity";
import { Opinion } from "../opinions/opinion.entity";

@Entity({ customRepository: () => EventsRepository })
@Filter({ name: 'withoutDeleted', cond: { deleted_at: null } })
@Filter({ name: 'active', cond: { $and: [
  { start_date: { $lt: getUnixTime(new Date()) }, },
  { deleted_at: null }
] } })
export class Event {

  @PrimaryKey()
  id?: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @ManyToOne(() => Provider)
  provider!: Provider;

  @Property()
  public!: boolean;

  @Property()
  address!: string;

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

  @ManyToMany(() => Tourist, tourist => tourist.events, { hidden:true })
  tourists = new Collection<Tourist>(this);

  @OneToMany(() => TouristsEvent, touristsEvents => touristsEvents.event, { hidden:true })
  touristsEvents = new Collection<TouristsEvent>(this);

  opinions? = new Collection<Opinion>(this);

  @ManyToMany(() => Category, 'events', { owner: true })
  categories = new Collection<Category>(this);

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden:true })
  createdAt = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden:true })
  updatedAt = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden:true })
  deleted_at?: number;
}

export const eventStatus = ['Activo', 'Cancelado', 'Finalizado'];
