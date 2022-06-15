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

  @Property({ hidden: true })
  password!: string;

  @Property({ default: 'Esperando aprobacion' })
  status?: string;

  @OneToMany(() => Event, event => event.provider)
  events = new Collection<Event>(this);

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()) })
  createdAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()) })
  updatedAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true })
  deleted_at?: number;
}

export const providerStatus = ['Esperando aprobacion', 'Aprobado', 'Desaprobado', 'Dado de Baja'];