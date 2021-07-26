import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Prediction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  group: string;

  constructor();
  constructor(label?: string, group?: string);

  constructor(label?: string, group?: string) {
    this.label = label || '';
    this.group = group || '';
  }
}
