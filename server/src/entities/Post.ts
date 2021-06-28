import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { Group } from './Group';
import { User } from './User';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user)
  postedBy: User;

  @ManyToOne(() => Group, (group) => group)
  postedIn: Group;

  @Column()
  date: Date;

  @OneToMany(() => Comment, (comment) => comment.leftIn)
  comments: Comment[];
}
