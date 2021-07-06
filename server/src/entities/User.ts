import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Group } from './Group';
import { File } from './File';
import { Post } from './Post';
import { Comment } from './Comment';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  uid: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column({ type: 'simple-array' })
  afflictions: string[];

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];

  constructor(username: string);
  constructor(
    username: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: Group[]
  );

  constructor(
    username: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: Group[]
  ) {
    this.username = username;
    this.email = email || '';
    this.country = country || '';
    this.afflictions = afflictions || [];
    this.groups = groups || null;
  }
}
