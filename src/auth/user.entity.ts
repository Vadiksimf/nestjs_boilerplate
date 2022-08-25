/* eslint-disable @typescript-eslint/no-unused-vars */
import { Task } from 'src/tasks/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  resetPasswordToken: string;
  @Column({ nullable: true })
  resetPasswordExpires: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  avatarUrl: string;
  @Column()
  role: UserRole;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
