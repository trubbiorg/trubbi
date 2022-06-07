import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Opinion } from "../opinions/opinion.entity";
import { Event } from "../events/event.entity";
import { Tourist } from "../tourists/tourist.entity";

@Entity({ customRepository: () => TouristsEvent })
export class TouristsEvent {

  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Tourist,{ primary: true })
  tourist: Tourist;

  @ManyToOne(() => Event,{ primary: true })
  event: Event;

  @Property()
  favourite!: boolean;

  @Property()
  scheduled!: boolean;

  @OneToOne(() => Opinion, opinion => opinion.touristEvent)
  opinion!: Opinion;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({nullable : true})
  deleted_at?: Date = null;
}
