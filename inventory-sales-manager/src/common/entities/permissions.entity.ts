import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}

