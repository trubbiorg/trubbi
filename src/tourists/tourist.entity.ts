import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { plainToClassFromExist } from "class-transformer";
import crypto from 'crypto';
import { Category } from "../categories/category.entity";
import { Event } from "../events/event.entity";
import { TouristsEvent } from "../tourists_events/tourists_event.entity";
import { TouristsRepository } from "./tourists.repository";

@Entity({ customRepository: () => TouristsRepository })
export class Tourist {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property({ hidden: true })
  password!: string;
  
  @ManyToMany({ entity: () => Event, pivotEntity: () => TouristsEvent })
  events = new Collection<Event>(this);

  @ManyToMany(() => Category, 'tourists', { owner: true })
  categories = new Collection<Category>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({nullable : true})
  deleted_at?: Date = null;

  constructor(name: string, email: string, phone: string, password: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
