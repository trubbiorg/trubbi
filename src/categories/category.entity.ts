import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Event } from "../events/event.entity";
import { Tourist } from "../tourists/tourist.entity";
import { CategoryRepository } from "./category.repository";

@Entity({ customRepository: () => CategoryRepository })
export class Category {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToMany(() => Event, event => event.categories)
  events = new Collection<Event>(this);

  @ManyToMany(() => Tourist, tourist => tourist.categories)
  tourists = new Collection<Tourist>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  deleted_at: Date;

  constructor(name: string) {
    this.name = name;
  }
}
