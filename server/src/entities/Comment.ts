import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Post, (post) => post.comments, { cascade: true })
  leftIn: Post;

  @ManyToOne(() => User, (user) => user.comments, { cascade: true })
  leftBy: User;

  constructor();
  constructor(content?: string, date?: Date, leftIn?: Post, leftBy?: User);

  constructor(content?: string, date?: Date, leftIn?: Post, leftBy?: User) {
    this.content = content || '';
    this.date = date || new Date();
    this.leftIn = leftIn || null;
    this.leftBy = leftBy || null;
  }
}
