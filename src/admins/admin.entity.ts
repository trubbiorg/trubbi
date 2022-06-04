import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import crypto from 'crypto';
import { AdminRepository } from "./admins.repository";

@Entity({ customRepository: () => AdminRepository })
export class Admin {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  deleted_at: Date;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = crypto.createHmac('sha256', password).digest('hex');
  }
}
