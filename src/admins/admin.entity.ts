import { Entity, PrimaryKey, Property, types } from "@mikro-orm/core";
import { getUnixTime } from "date-fns";
import { AdminRepository } from "./admins.repository";

@Entity({ customRepository: () => AdminRepository })
export class Admin {

  @PrimaryKey()
  id?: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ type: types.integer, length: 11, onCreate: () => getUnixTime(new Date()), hidden: true })
  createdAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, onUpdate: () => getUnixTime(new Date()), hidden: true })
  updatedAt: number = getUnixTime(new Date());

  @Property({ type: types.integer, length: 11, nullable : true, hidden: true })
  deleted_at?: number;
}
