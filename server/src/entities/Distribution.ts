import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Distribution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityId: number;

  @Column()
  type: string;

  @Column({ type: 'simple-array' })
  values: number[];

  constructor();
  constructor(entityId?: number, type?: string, values?: number[]);

  constructor(entityId?: number, type?: string, values?: number[]) {
    this.entityId = entityId || 0;
    this.type = type || '';
    this.values = values || [];
  }
}
