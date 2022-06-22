import { Entity, OneToOne, PrimaryKey, Property, types } from "@mikro-orm/core";
import { getUnixTime } from "date-fns";
import { TouristsEvent } from "../tourists/tourists_event.entity";
import { OpinionsRepository } from "./opinions.repository";

@Entity({ customRepository: () => OpinionsRepository })
export class Opinion {

  @PrimaryKey()
  id?: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @OneToOne(() => TouristsEvent)
  touristEvent: TouristsEvent;

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden: true })
  createdAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden: true })
  updatedAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden: true })
  deleted_at?: number;
}
