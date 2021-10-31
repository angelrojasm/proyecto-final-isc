import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recommendations {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  @Column({ type: 'simple-array' })
  groups: number[];

  @Column({ type: 'simple-array' })
  correlations: number[];
  constructor();
  constructor(userId?: number, groups?: number[], correlations?: number[]);

  constructor(userId?: number, groups?: number[], correlations?: number[]) {
    this.userId = userId || 0;
    this.groups = groups || [];
    this.correlations = correlations || [];
  }
}
