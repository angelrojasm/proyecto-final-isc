import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Group } from './Group';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  afflictions: string[];

  @ManyToMany(() => Group, (group) => group.users)
  groups: User[];

  constructor();
  constructor(
    username?: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: User[]
  );

  constructor(
    username?: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: User[]
  ) {
    this.username = username || '';
    this.email = email || '';
    this.country = country || '';
    this.afflictions = afflictions || [];
    this.groups = groups || [];
  }
}
