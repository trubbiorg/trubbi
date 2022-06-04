import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { TouristsEvent } from "../tourists_events/tourists_event.entity";
import { OpinionsRepository } from "./opinions.repository";

@Entity({ customRepository: () => OpinionsRepository })
export class Opinion {

  @PrimaryKey()
  id!: number;

  @Property()
  opinion!: string;

  @OneToOne(() => TouristsEvent)
  touristEvent!: TouristsEvent;
}
