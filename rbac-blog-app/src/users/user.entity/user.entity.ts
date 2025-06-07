import { Blog } from 'src/blogs/blog.entity/blog.entity';
import { Role } from 'src/roles/role.entity/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, role => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Blog, blog => blog.user)
  blogs: Blog[];
}

