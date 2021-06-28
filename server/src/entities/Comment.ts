import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  leftIn: Post;

  constructor();
  constructor(content?: string, date?: Date, leftIn?: Post);

  constructor(content?: string, date?: Date, leftIn?: Post) {
    this.content = content || '';
    this.date = date || new Date();
    this.leftIn = leftIn || null;
  }
}
