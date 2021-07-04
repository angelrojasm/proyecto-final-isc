import { getRepository, Repository } from 'typeorm';
import { Comment } from '../entities/Comment';
import { Post } from '../entities/Post';
import {
  JsonController,
  Get,
  Post as PostMethod,
  Delete,
  BodyParam,
  Param,
} from 'routing-controllers';
import { EntityFromParam } from 'typeorm-routing-controllers-extensions';
import { PostController } from './PostController';
import { UserController } from './UserController';

@JsonController('/comments')
export class CommentController {
  private commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = getRepository(Comment);
  }

  @Get(`/:id`)
  async getComments(@Param('id') postId: number) {
    let post = await new PostController().findById(postId);
    return this.commentRepository.find({
      where: { leftIn: post },
      relations: ['leftIn', 'leftBy'],
    });
  }

  @PostMethod(`/`)
  async save(
    @BodyParam('comment') comment: Comment,
    @BodyParam('postId') postId: number,
    @BodyParam('userId') userId: number
  ) {
    let post = await new PostController().findById(postId);
    let user = await new UserController().findById(userId);
    comment.leftIn = post;
    comment.leftBy = user;
    return this.commentRepository.save(comment);
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') comment: Comment) {
    return this.commentRepository.remove(comment);
  }
}
