import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  role: string;

  @Column({ type: 'simple-array' })
  afflictions: string[];

  @Column({ type: 'simple-array' })
  groups: number[];

  constructor(username: string);
  constructor(
    username: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: number[],
    role?: string
  );

  constructor(
    username: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: number[],
    role?: string
  ) {
    this.username = username;
    this.email = email || '';
    this.country = country || '';
    this.afflictions = afflictions || [];
    this.groups = groups || [];
    this.role = role || 'user';
  }
}
