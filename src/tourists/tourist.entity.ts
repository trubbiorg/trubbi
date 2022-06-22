import { Collection, Entity, Filter, ManyToMany, OneToMany, PrimaryKey, Property, types } from "@mikro-orm/core";
import { getUnixTime } from "date-fns";
import { Category } from "../categories/category.entity";
import { Event } from "../events/event.entity";
import { TouristsEvent } from "./tourists_event.entity";
import { TouristsRepository } from "./tourists.repository";

@Entity({ customRepository: () => TouristsRepository })
@Filter({ name: 'withoutTouristsDeleted', cond: { deleted_at: null } })
export class Tourist {

  @PrimaryKey()
  id?: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @ManyToMany({ entity: () => Event, owner: true, pivotEntity: () => TouristsEvent, hidden:true })
  events = new Collection<Event>(this);

  @ManyToMany(() => Category, 'tourists', { owner: true, hidden: true })
  categories = new Collection<Category>(this);

  @OneToMany(() => TouristsEvent, touristsEvents => touristsEvents.tourist, { hidden:true })
  touristsEvents = new Collection<TouristsEvent>(this);

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden: true })
  createdAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden: true })
  updatedAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden: true })
  deleted_at?: number;
}
