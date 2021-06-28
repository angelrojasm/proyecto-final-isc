import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { File } from './File';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalUsers: number;

  @Column()
  creationDate: Date;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  users: User[];

  @OneToMany(() => Post, (post) => post.postedIn)
  posts: Post[];

  @OneToMany(() => File, (file) => file.uploadedIn)
  files: File[];
}
