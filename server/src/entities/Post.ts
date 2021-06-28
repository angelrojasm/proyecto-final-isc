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

  constructor();
  constructor(
    content?: string,
    postedBy?: User,
    postedIn?: Group,
    date?: Date,
    comments?: Comment[]
  );

  constructor(
    content?: string,
    postedBy?: User,
    postedIn?: Group,
    date?: Date,
    comments?: Comment[]
  ) {
    this.content = content || '';
    this.postedBy = postedBy || null;
    this.postedIn = postedIn || null;
    this.date = date || new Date();
    this.comments = comments || [];
  }
}
