import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Category } from "../categories/category.entity";
import { Provider } from "../providers/provider.entity";
import { Tourist } from "../tourists/tourist.entity";
import { EventsRepository } from "./events.repository";

@Entity({ customRepository: () => EventsRepository })
export class Event {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @ManyToOne()
  provider!: Provider;

  @Property()
  address!: string;

  @Property()
  photo!: string;

  @Property()
  start_date!: string;

  @Property()
  end_date!: string;

  @Property()
  publish_date: string = "2022-06-15T15:00";

  @Property()
  end_Publish_date: string = "2022-06-15T15:00";

  @ManyToMany(() => Tourist, tourist => tourist.events)
  tourists = new Collection<Tourist>(this);

  @ManyToMany(() => Category, 'events', { owner: true })
  categories = new Collection<Category>(this);
}
