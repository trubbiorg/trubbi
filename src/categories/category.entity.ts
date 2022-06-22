import { Collection, Entity, Filter, ManyToMany, PrimaryKey, Property, types } from "@mikro-orm/core";
import { Event } from "../events/event.entity";
import { Tourist } from "../tourists/tourist.entity";
import { CategoryRepository } from "./category.repository";
import { getUnixTime } from 'date-fns'

@Entity({ customRepository: () => CategoryRepository })
@Filter({ name: 'findByIds', cond: args => ({ id: { $in: args.ids } }) })
@Filter({ name: 'withoutCategoriesDeleted', cond: { deleted_at: null } })
export class Category {

  @PrimaryKey()
  id?: number;

  @Property()
  name!: string;

  @ManyToMany(() => Event, event => event.categories, { hidden: true })
  events = new Collection<Event>(this);

  @ManyToMany(() => Tourist, tourist => tourist.categories, { hidden: true })
  tourists = new Collection<Tourist>(this);

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden: true })
  createdAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden: true })
  updatedAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden: true })
  deleted_at?: number;

  constructor(name) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
