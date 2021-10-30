import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recommendations {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  @Column({ type: 'simple-array' })
  groups: number[];

  constructor();
  constructor(userId?: number, groups?: number[]);

  constructor(userId?: number, groups?: number[]) {
    this.userId = userId || 0;
    this.groups = groups || [];
  }
}
