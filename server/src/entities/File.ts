import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './Group';
import { User } from './User';
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  uploadedIn: string;

  @Column()
  uploadedBy: string;

  @Column()
  date: Date;

  constructor();
  constructor(filename?: string, uploadedIn?: string, date?: Date, uploadedBy?: string);
  constructor(filename?: string, uploadedIn?: string, date?: Date, uploadedBy?: string) {
    this.filename = filename || '';
    this.uploadedIn = uploadedIn || '';
    this.date = date || new Date();
    this.uploadedBy = uploadedBy || '';
  }
}
