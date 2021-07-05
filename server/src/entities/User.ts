import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Group } from './Group';
import { File } from './File';
import { Post } from './Post';
import { Comment } from './Comment';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  uid: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column({ type: 'simple-array' })
  afflictions: string[];

  @OneToMany(() => File, (file) => file.uploadedIn)
  files: File[];

  @OneToMany(() => Comment, (comment) => comment.leftBy)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.postedBy)
  posts: Post[];

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];

  constructor(username: string);
  constructor(
    username: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: Group[],
    files?: File[],
    comments?: Comment[],
    posts?: Post[]
  );

  constructor(
    username: string,
    email?: string,
    country?: string,
    afflictions?: string[],
    groups?: Group[],
    files?: File[],
    comments?: Comment[],
    posts?: Post[]
  ) {
    this.username = username;
    this.email = email || '';
    this.country = country || '';
    this.afflictions = afflictions || [];
    this.groups = groups || null;
    this.files = files || null;
    this.comments = comments || null;
    this.posts = posts || null;
  }
}
