import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './Group';
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @ManyToOne(() => Group, (group) => group.files)
  uploadedIn: Group;

  @Column()
  date: Date;

  constructor();
  constructor(filename?: string, uploadedIn?: Group, date?: Date);
  constructor(filename?: string, uploadedIn?: Group, date?: Date) {
    this.filename = filename || '';
    this.uploadedIn = uploadedIn || null;
    this.date = date || new Date();
  }
}
