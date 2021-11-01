import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { Group } from './Group';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 3000 })
  content: string;

  @Column()
  postedBy: string;

  @Column()
  postedIn: string;

  @Column()
  date: Date;

  @OneToMany(() => Comment, (comment) => comment.leftIn)
  comments: Comment[];

  constructor();
  constructor(
    content?: string,
    postedBy?: string,
    postedIn?: string,
    date?: Date,
    comments?: Comment[]
  );

  constructor(
    content?: string,
    postedBy?: string,
    postedIn?: string,
    date?: Date,
    comments?: Comment[]
  ) {
    this.content = content || '';
    this.postedBy = postedBy || '';
    this.postedIn = postedIn || '';
    this.date = date || new Date();
    this.comments = comments || null;
  }
}
