import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  uploadedIn: number;

  @Column()
  uploadedBy: number;

  @Column()
  date: Date;

  constructor();
  constructor(filename?: string, uploadedIn?: number, date?: Date, uploadedBy?: number);
  constructor(filename?: string, uploadedIn?: number, date?: Date, uploadedBy?: number) {
    this.filename = filename || '';
    this.uploadedIn = uploadedIn || 0;
    this.date = date || new Date();
    this.uploadedBy = uploadedBy || 0;
  }
}
