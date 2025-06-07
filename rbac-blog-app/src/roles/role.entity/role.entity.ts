import { Permission } from 'src/permissions/permission.entity/permission.entity';
import { User } from 'src/users/user.entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // 'super-admin' | 'admin' | 'user'

  @OneToMany(() => User, user => user.role)
  users: User[];

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];
}

