import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './Group';
import { User } from './User';
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @ManyToOne(() => Group, (group) => group.files, { cascade: true })
  uploadedIn: Group;

  @ManyToOne(() => User, (user) => user.files, { cascade: true })
  uploadedBy: User;

  @Column()
  date: Date;

  constructor();
  constructor(filename?: string, uploadedIn?: Group, date?: Date, uploadedBy?: User);
  constructor(filename?: string, uploadedIn?: Group, date?: Date, uploadedBy?: User) {
    this.filename = filename || '';
    this.uploadedIn = uploadedIn || null;
    this.date = date || new Date();
    this.uploadedBy = uploadedBy || null;
  }
}
