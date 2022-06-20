import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { TouristsEvent } from "../tourists/tourists_event.entity";
import { OpinionsRepository } from "./opinions.repository";

@Entity({ customRepository: () => OpinionsRepository })
export class Opinion {

  @PrimaryKey()
  id!: number;

  @Property()
  opinion!: string;

  @OneToOne(() => TouristsEvent)
  touristEvent: TouristsEvent;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({nullable : true})
  deleted_at?: Date = null;
}
