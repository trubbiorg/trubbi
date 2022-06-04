import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Event } from "../events/event.entity";
import { ProviderRepository } from "./providers.repository";

@Entity({ customRepository: () => ProviderRepository })
export class Provider {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  phone!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ default: false })
  status?: boolean;
  
  @OneToMany(() => Event, event => event.provider)
  events? = new Collection<Event>(this);

  @Property()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property({nullable: true})
  deleted_at?: Date = null;

  constructor(name: string, phone: string, password: string) {
    this.name = name;
    this.phone = phone;
    this.password = password;
  }
}
