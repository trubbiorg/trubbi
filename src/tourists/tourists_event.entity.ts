import { Entity, ManyToOne, OneToOne, PrimaryKey, PrimaryKeyType, Property, types } from "@mikro-orm/core";
import { Opinion } from "../opinions/opinion.entity";
import { Event } from "../events/event.entity";
import { Tourist } from "./tourist.entity";
import { TouristsEventRepository } from "./tourists_event.repository";
import { getUnixTime } from "date-fns";

@Entity({ customRepository: () => TouristsEventRepository })
export class TouristsEvent {
  [PrimaryKeyType]?: [number, number];

  @ManyToOne(() => Tourist, { primary: true })
  tourist!: Tourist;

  @ManyToOne(() => Event, { primary: true })
  event!: Event;

  @Property({ default: false })
  favourite?: boolean = false;

  @Property({ default: false })
  scheduled?: boolean = false;

  @OneToOne(() => Opinion, opinion => opinion.touristEvent, { hidden: true })
  opinion?: Opinion;

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden: true })
  createdAt?: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden: true })
  updatedAt?: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden: true })
  deleted_at?: number;
}
