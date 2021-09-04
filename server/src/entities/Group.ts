import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { User } from './User';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalUsers: number;

  @Column()
  creationDate: Date;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ type: 'simple-array' })
  users: number[];

  constructor(name: string);
  constructor(
    name: string,
    description?: string,
    totalUsers?: number,
    creationDate?: Date,
    users?: number[],
    tags?: string[]
  );
  constructor(
    name: string,
    description?: string,
    totalUsers?: number,
    creationDate?: Date,
    users?: number[],
    tags?: string[]
  ) {
    this.name = name;
    this.description = description || '';
    this.totalUsers = totalUsers || 0;
    this.creationDate = creationDate || new Date();
    this.users = users || [];
    this.tags = tags || [];
  }
}
