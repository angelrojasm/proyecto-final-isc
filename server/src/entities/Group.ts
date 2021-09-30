import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  region: string;

  @Column()
  totalUsers: number;

  @Column()
  creationDate: Date;

  @Column()
  isPrivate: boolean;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ type: 'simple-array' })
  bannedUsers: number[];

  @Column({ type: 'simple-array' })
  users: number[];

  constructor(name: string);
  constructor(
    name: string,
    description?: string,
    totalUsers?: number,
    creationDate?: Date,
    users?: number[],
    bannedUsers?: number[],
    isPrivate?: boolean,
    tags?: string[],
    region?: string
  );
  constructor(
    name: string,
    description?: string,
    totalUsers?: number,
    creationDate?: Date,
    users?: number[],
    bannedUsers?: number[],
    isPrivate?: boolean,
    tags?: string[],
    region?: string
  ) {
    this.name = name;
    this.description = description || '';
    this.totalUsers = totalUsers || 0;
    this.creationDate = creationDate || new Date();
    this.users = users || [];
    this.bannedUsers = bannedUsers || [];
    this.isPrivate = isPrivate || false;
    this.tags = tags || [];
    this.region = region || '';
  }
}
