import { Collection, Entity, Filter, OneToMany, PrimaryKey, Property, types } from "@mikro-orm/core";
import { Event } from "../events/event.entity";
import { ProviderRepository } from "./providers.repository";
import { getUnixTime } from 'date-fns'

@Entity({ customRepository: () => ProviderRepository })
@Filter({ name: 'withoutDeleted', cond: { deleted_at: null } })
export class Provider {

  @PrimaryKey()
  id?: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ default: 'Esperando aprobacion' })
  status?: string;

  @OneToMany(() => Event, event => event.provider, { hidden: true })
  events = new Collection<Event>(this);

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden: true })
  createdAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden: true })
  updatedAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden: true })
  deleted_at?: number;
}

export const providerStatus = ['Esperando aprobacion', 'Aprobado', 'Desaprobado', 'Dado de Baja'];