import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 3000 })
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Post, (post) => post.comments, { cascade: true })
  leftIn: Post;

  @Column()
  leftBy: string;

  constructor();
  constructor(content?: string, date?: Date, leftIn?: Post, leftBy?: string);

  constructor(content?: string, date?: Date, leftIn?: Post, leftBy?: string) {
    this.content = content || '';
    this.date = date || new Date();
    this.leftIn = leftIn || null;
    this.leftBy = leftBy || '';
  }
}
